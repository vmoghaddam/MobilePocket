using DevExpress.DataAccess.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Report
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string apiUrl = WebConfigurationManager.AppSettings["api_url"];
            // string df = Request.QueryString["from"];
            // string dt = Request.QueryString["to"];
            string df = "20200101";
            string dt = "20200503";
            int d = Convert.ToInt32(Request.QueryString["d"]);
            string type = Request.QueryString["type"];
            if (string.IsNullOrEmpty(type))
                type = "easafcl16";
            string prms = Request.QueryString["prms"];
            int reportId = -1;
            int airlineId = -1;
            int flightStatusId = -1;
            int employeeId = 297;

            JsonDataSource dataSource = null;

            switch (type)
            {
                case "easafcl16":
                    var rptEASAFCL16 = new RptTwoPageLogBook();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/crew/flights/app2/?id=" + employeeId + "&df=" + df + "&dt=" + dt + "&status=" + flightStatusId + "&airline=" + airlineId + "&report=" + reportId));
                    dataSource.Fill();
                    rptEASAFCL16.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptEASAFCL16);
                    break;
                default:
                    break;

            }
           // var report = new RptTwoPageLogBook();

            // var jsonDataSource = new JsonDataSource();

            // jsonDataSource.JsonSource = new UriJsonSource(new Uri("http://fleet.flypersia.aero/api.airpocket/odata/fuel/report/?$top=2020&dt=2020-01-12T00:00:00&df=2020-01-12T00:00:00&%24orderby=STDDay%2CSTDLocal&%24filter=(FlightId%20gt%200)"));

            // jsonDataSource.Fill();

            //report.DataSource = jsonDataSource;




        }
    }
}