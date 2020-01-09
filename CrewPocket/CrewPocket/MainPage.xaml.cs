using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using XLabs.Forms.Controls;
using XLabs.Serialization.JsonNET;

namespace CrewPocket
{
    public partial class MainPage : ContentPage
    {
        private   string WebViewUrl = "http://app.epapocket.ir/#!/home";
        private const string LoginCallback = "login";
        private const string DisplayLoginAlertFunctioName = "displayLoginAlert";
        private const string Username = "User";
        HybridWebView webView;
        public MainPage()
        {
            InitializeComponent();
            var serializer = new JsonSerializer();
            var loggedUser = App.Database.GetLoggedUser().Result;
            var lastHistory = App.Database.GetLastHistory().Result ;
            if (lastHistory != null)
                WebViewUrl = lastHistory.url;
            webView = new HybridWebView(serializer)
            {
                VerticalOptions = LayoutOptions.FillAndExpand,
                HorizontalOptions = LayoutOptions.FillAndExpand,
                Margin = new Thickness(0, 0),
                Uri = new Uri(WebViewUrl)
            };

            webView.LoadFinished += LoadFinished;


            webView.RegisterCallback(LoginCallback, (arg) =>
            {
                //var loginForm = serializer.Deserialize<LoginFormDto>(arg);
                //var result = loginForm.Username == Username;
                //try
                //{
                //    // await Task.Run(() => Device.BeginInvokeOnMainThread(() => Play_Animation()));
                //    Device.BeginInvokeOnMainThread(()=> webView.CallJsFunction(DisplayLoginAlertFunctioName, new[] { result.ToString() }));
                //  //  webView.CallJsFunction(DisplayLoginAlertFunctioName, new[] { result.ToString() });
                //}
                //catch(Exception ex)
                //{

                //}

                var str = arg; //serializer.Deserialize<string>(arg);


            });

            //webView.RegisterCallback(LoginCallback, (arg) =>
            //{
            //    //var loginForm = serializer.Deserialize<LoginFormDto>(arg);
            //    //var result = loginForm.Username == Username;
            //    //try
            //    //{
            //    //    // await Task.Run(() => Device.BeginInvokeOnMainThread(() => Play_Animation()));
            //    //    Device.BeginInvokeOnMainThread(()=> webView.CallJsFunction(DisplayLoginAlertFunctioName, new[] { result.ToString() }));
            //    //  //  webView.CallJsFunction(DisplayLoginAlertFunctioName, new[] { result.ToString() });
            //    //}
            //    //catch(Exception ex)
            //    //{

            //    //}

            //    var str = arg; //serializer.Deserialize<string>(arg);


            //});

            webView.RegisterCallback("exportLoginData", async (arg) =>
            {
                var data = serializer.Deserialize<MobilePocketCore.Model.LoggedUser>(arg);

                var id = await App.Database.SaveLoggedUserAsync(data);
            });
            webView.RegisterCallback("exportLogoutData", async (arg) =>
             {
                 var data = arg;
                 var id = await App.Database.DeleteLoggedUserAsync();
             });
            webView.RegisterCallback("exportCurrentUrl", async (arg) =>
             {
                 var data = arg;
                 await App.Database.SaveHistoryAsync(new MobilePocketCore.Model.UrlHistory()
                 {
                     date = DateTime.Now,
                     url = arg,
                 });
             });
            //Content = webView;
            gridContainer.Children.Add(webView);
        }



        protected override bool OnBackButtonPressed()
        {

            webView.CallJsFunction("goBack");
            return true;
            //    if (browser.CanGoBack)
            //    {
            //       // Task<string> task = Task.Run<string>(async () => await GetValueFromTextbox());
            //      //  var cccc = task.Result;
            //        browser.GoBack();
            //        return true;
            //    }
            //    return true;
            //    //else return base.OnBackButtonPressed();
            //}

            //void OnNavigating(object sender, WebNavigatingEventArgs args)
            //{
            //    // Checking if we are at the home page url
            //    // browser.CanGoBack does not seem to be working (not updating in time)
            //    NavigationPage.SetHasNavigationBar(this, args.Url != Url);
        }
        void LoadFinished(object o, EventArgs e)
        {


        }
        string GetUrl()
        {

            return "http://app.epapocket.ir";
        }



    }

    public class LoginData
    {
        public string userName { get; set; }
        public string userTitle { get; set; }
        public string userId { get; set; }
        public string employeeId { get; set; }
        public string roles { get; set; }
        public string claims { get; set; }
    }
}
