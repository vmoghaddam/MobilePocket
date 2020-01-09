using System;
using System.Collections.Generic;
using System.Linq;

using Foundation;
using UIKit;

using Syncfusion.SfDataGrid.XForms.iOS;

using Syncfusion.SfGauge.XForms.iOS;

using Syncfusion.ListView.XForms.iOS;

using Syncfusion.XForms.iOS.TabView;

using Syncfusion.XForms.iOS.Buttons;

using Syncfusion.XForms.iOS.Cards;

using Syncfusion.XForms.iOS.Accordion;

namespace CrewPocketSync.iOS
{
    // The UIApplicationDelegate for the application. This class is responsible for launching the 
    // User Interface of the application, as well as listening (and optionally responding) to 
    // application events from iOS.
    [Register("AppDelegate")]
    public partial class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
    {
        //
        // This method is invoked when the application has loaded and is ready to run. In this 
        // method you should instantiate the window, load the UI into it and then make the window
        // visible.
        //
        // You have 17 seconds to return from this method, or iOS will terminate your application.
        //
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
            global::Xamarin.Forms.Forms.Init();
            
			SfDataGridRenderer.Init();
			
			
			SfGaugeRenderer.Init();
			
			
			SfListViewRenderer.Init();
			
			
			SfTabViewRenderer.Init();
			
			
			SfCheckBoxRenderer.Init();
			
			
			SfRadioButtonRenderer.Init();
			
			
			SfButtonRenderer.Init();
			
			
			SfCardViewRenderer.Init();
			
			
			SfAccordionRenderer.Init();
			
			LoadApplication(new App());

            return base.FinishedLaunching(app, options);
        }
    }
}