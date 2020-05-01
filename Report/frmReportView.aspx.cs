using DevExpress.DataAccess.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Report
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string from = Request.QueryString["from"];
            string to = Request.QueryString["to"];
            int d = Convert.ToInt32(Request.QueryString["d"]);
            string type = Request.QueryString["type"];
            string prms = Request.QueryString["prms"];
            switch (type)
            {
                case "a":

                    { 
                       // var report = new XtraReport2();
                        //var jsonDataSource = new JsonDataSource();
                        //jsonDataSource.JsonSource = new UriJsonSource(new Uri("http://fleet.flypersia.aero/api.airpocket/odata/fuel/report/?dt=2020-01-12T00:00:00&df=2020-01-12T00:00:00&%24orderby=STDDay%2CSTDLocal&%24filter=(FlightId%20gt%200)"));
                        //jsonDataSource.Fill();
                        break;
                    }
            }
            var report = new RptTwoPageLogBook();
           // var jsonDataSource = new JsonDataSource();
           
           // jsonDataSource.JsonSource = new UriJsonSource(new Uri("http://fleet.flypersia.aero/api.airpocket/odata/fuel/report/?$top=2020&dt=2020-01-12T00:00:00&df=2020-01-12T00:00:00&%24orderby=STDDay%2CSTDLocal&%24filter=(FlightId%20gt%200)"));
           
           // jsonDataSource.Fill();

            //report.DataSource = jsonDataSource;
             ASPxWebDocumentViewer1.OpenReport(report);
           


        }
    }
}