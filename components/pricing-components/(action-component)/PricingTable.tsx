"use client"

import * as React from 'react';
import { useEffect } from 'react';

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }

function PricingPage() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/pricing-table.js"
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    })
    
   
  return (
    React.createElement("stripe-pricing-table", {"pricing-table-id": "prctbl_1PV353LMgLErvdlXgdgRfcZy", 
    "publishable-key": "pk_test_51PHwnhLMgLErvdlXY2th3NTqyrHT9C4G6FARpBwrCK6EsjfDTY06TDSGlNIkRXSqnN04oWdbIZEA9Z4OyFNcNw6t00fwWBE3gU",})
  );
}

export default PricingPage;

