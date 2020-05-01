using Microsoft.AppCenter;
using Microsoft.AppCenter.Analytics;
using Microsoft.AppCenter.Crashes;
using Microsoft.AppCenter.Push;
using MobilePocketCore;
using System;
using System.IO;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using AndroidSpecific = Xamarin.Forms.PlatformConfiguration.AndroidSpecific;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace CrewPocket
{
    public partial class App : Application
    {
        static Database database;

        public static Database Database
        {
            get
            {
                if (database == null)
                {
                    database = new Database(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "crewpocket.db3"));
                }
                return database;
            }
        }
        public App()
        {
            InitializeComponent();
            AndroidSpecific.Application.SetWindowSoftInputModeAdjust(this, AndroidSpecific.WindowSoftInputModeAdjust.Resize);
            MainPage = new MainPage();
        }

        protected override void OnStart()
        {
            // This should come before AppCenter.Start() is called
            // Avoid duplicate event registration:
            if (!AppCenter.Configured)
            {
                Push.PushNotificationReceived += (sender, e) =>
                {
                    // Add the notification message and title to the message
                    var summary = $"Push notification received:" +
                                        $"\n\tNotification title: {e.Title}" +
                                        $"\n\tMessage: {e.Message}";

                    // If there is custom data associated with the notification,
                    // print the entries
                    if (e.CustomData != null)
                    {
                        summary += "\n\tCustom data:\n";
                        foreach (var key in e.CustomData.Keys)
                        {
                            summary += $"\t\t{key} : {e.CustomData[key]}\n";
                        }
                    }

                    // Send the notification summary to debug output
                    System.Diagnostics.Debug.WriteLine(summary);
                };
            }

            // AppCenter.start after
            // Handle when your app starts

            AppCenter.Start("android=992a9dec-e981-4645-afb9-05b77cd18329;",
                      typeof(Analytics), typeof(Crashes), typeof(Push));

            AppCenter.SetUserId("1381");


        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
