using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;
using DevExpress.XtraReports.Expressions;

namespace Report
{
    public partial class RptFlight : DevExpress.XtraReports.UI.XtraReport
    {
        public RptFlight()
        {
            InitializeComponent();
            CustomFunctions.Register(new MyCustomFunction());
            lblDateFrom.Text = "05-03-2020";

        }
       
        private void xrTableCell113_AfterPrint(object sender, EventArgs e)
        {
             
        }

        private void xrTableCell113_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
          
        }
    }
}
