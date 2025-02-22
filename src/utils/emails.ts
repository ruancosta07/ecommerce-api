import { ProductsDto } from "src/products/products.dto";

export const successPurchase = ({ products, total, }: { products: ProductsDto[], total: number }) => `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
 <meta charset="UTF-8" />
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <!--[if !mso]><!-- -->
 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <!--<![endif]-->
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
 <meta name="x-apple-disable-message-reformatting" />
 <link href="https://fonts.googleapis.com/css?family=Bricolage+Grotesque:ital,wght@0,400;0,500;0,600" rel="stylesheet" />
 <link href="https://fonts.googleapis.com/css?family=Inter:ital,wght@0,400;0,400" rel="stylesheet" />
 <link href="https://fonts.googleapis.com/css?family=Fira+Sans:ital,wght@0,400;0,500;0,700" rel="stylesheet" />
 <title>Untitled</title>
 <!-- Made with Postcards Email Builder by Designmodo -->
 <!--[if !mso]><!-- -->
 <style>
 @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
         @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
         @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
         @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
                         @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
         @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
         @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
         @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
 </style>
 <!--<![endif]-->
 <style>
 html, body { margin: 0 !important; padding: 0 !important; min-height: 100% !important; width: 100% !important; -webkit-font-smoothing: antialiased; }
         * { -ms-text-size-adjust: 100%; }
         #outlook a { padding: 0; }
         .ReadMsgBody, .ExternalClass { width: 100%; }
         .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height: 100%; }
         table, td, th { mso-table-lspace: 0 !important; mso-table-rspace: 0 !important; border-collapse: collapse; }
         u + .body table, u + .body td, u + .body th { will-change: transform; }
         body, td, th, p, div, li, a, span { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; }
         img { border: 0; outline: 0; line-height: 100%; text-decoration: none; -ms-interpolation-mode: bicubic; }
         a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
         .body .pc-project-body { background-color: transparent !important; }
                 
 
         @media (min-width: 621px) {
             .pc-lg-hide {  display: none; } 
             .pc-lg-bg-img-hide { background-image: none !important; }
         }
 </style>
 <style>
 @media (max-width: 620px) {
 .pc-project-body {min-width: 0px !important;}
 .pc-project-container {width: 100% !important;}
 .pc-sm-hide, .pc-w620-gridCollapsed-1 > tbody > tr > .pc-sm-hide {display: none !important;}
 .pc-sm-bg-img-hide {background-image: none !important;}
 .pc-w620-font-size-30px {font-size: 30px !important;}
 .pc-w620-line-height-133pc {line-height: 133% !important;}
 .pc-w620-font-size-18px {font-size: 18px !important;}
 .pc-w620-line-height-156pc {line-height: 156% !important;}
 .pc-w620-font-size-16px {font-size: 16px !important;}
 .pc-w620-line-height-163pc {line-height: 163% !important;}
 .pc-w620-itemsSpacings-0-10 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 5px !important;padding-bottom: 5px !important;}
 .pc-w620-padding-0-0-0-0 {padding: 0px 0px 0px 0px !important;}
 table.pc-w620-spacing-0-0-0-0 {margin: 0px 0px 0px 0px !important;}
 td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin: 0 !important;padding: 0px 0px 0px 0px !important;}
 .pc-w620-line-height-125pc {line-height: 125% !important;}
 .pc-w620-width-auto {width: auto !important;}
 .pc-w620-fontSize-22 {font-size: 22px !important;}
 .pc-w620-lineHeight-145pc {line-height: 145% !important;}
 .pc-w620-font-size-22px {font-size: 22px !important;}
 .pc-w620-line-height-145pc {line-height: 145% !important;}
 .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;}
 
 .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
 .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
 .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
 .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;margin-left: 0 !important;}
 .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
 .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
 .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,.pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
 .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,.pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
 
 .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
 
 .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
 .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
 .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
 .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
 .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
 .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
 }
 @media (max-width: 520px) {
 .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
 }
 </style>
 <!--[if !mso]><!-- -->
 <style>
 @font-face { font-family: 'Bricolage Grotesque'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvRvi-MQltA.woff') format('woff'), url('https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvRvi-MQlsg.woff2') format('woff2'); } @font-face { font-family: 'Bricolage Grotesque'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvSni-MQltA.woff') format('woff'), url('https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvSni-MQlsg.woff2') format('woff2'); } @font-face { font-family: 'Bricolage Grotesque'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvcXl-MQltA.woff') format('woff'), url('https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvcXl-MQlsg.woff2') format('woff2'); } @font-face { font-family: 'Inter'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZFhjg.woff') format('woff'), url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZFhiA.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjN.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjL.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6.woff2') format('woff2'); }
 </style>
 <!--<![endif]-->
 <!--[if mso]>
    <style type="text/css">
        .pc-font-alt {
            font-family: Arial, Helvetica, sans-serif !important;
        }
    </style>
    <![endif]-->
 <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
</head>

<body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; font-weight: normal; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #f4f4f4;" bgcolor="#f4f4f4">
 <table class="pc-project-body" style="table-layout: fixed; width: 100%; min-width: 600px; background-color: #f4f4f4;" bgcolor="#f4f4f4" border="0" cellspacing="0" cellpadding="0" role="presentation">
  <tr>
   <td align="center" valign="top">
    <table class="pc-project-container" align="center" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
     <tr>
      <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tr>
         <td valign="top">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; height: unset; background-color: #1a1a1a;" bgcolor="#1a1a1a">
             <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
               <td align="1" valign="top" style="padding: 0px 0px 15px 0px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                 <tr>
                  <td valign="top" align="left">
                   <div class="pc-font-alt" style="text-decoration: none;">
                    <div style="font-size: 30px;line-height: 39.9px;text-align:left;text-align-last:left;color:#ffffff;letter-spacing:-0.6px;font-weight:600;font-style:normal;">
                     <div><span style="font-family: 'Bricolage Grotesque', Arial, Helvetica, sans-serif; font-size: 36px; line-height: 128%;" class="pc-w620-font-size-30px pc-w620-line-height-133pc">Obrigado pela sua compra!</span>
                     </div>
                    </div>
                   </div>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
             <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
               <td align="1" valign="top" style="padding: 0px 0px 30px 0px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                 <tr>
                  <td valign="top" align="left">
                   <div class="pc-font-alt" style="text-decoration: none;">
                    <div style="font-size: 18px;line-height: 28.08px;text-align:left;text-align-last:left;color:#9b9b9b;letter-spacing:-0.4px;font-weight:400;font-style:normal;">
                     <div><span style="font-family: 'Inter', Arial, Helvetica, sans-serif; font-size: 20px; line-height: 150%;" class="pc-w620-font-size-18px pc-w620-line-height-156pc">Agradecemos pela sua compra e por comprar conosco. Recebemos seu pagamento e ele foi processado com sucesso. Em breve você receberá mais informações sobre o rastreio.</span>
                     </div>
                    </div>
                   </div>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
             <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
               <th valign="top" align="left" style="padding: 0px 0px 40px 0px; text-align: left;">
                <!--[if mso]>
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="left" style="border-collapse: separate; border-spacing: 0;">
            <tr>
                <td valign="middle" align="center" style="border-radius: 6px 6px 6px 6px; background-color: #ffffff; text-align:center; color: #ffffff; mso-padding-left-alt: 0; margin-left:20px;" bgcolor="#ffffff">
                                    <a class="pc-font-alt" style="display: inline-block;  padding: 10px 10px 10px 10px;  text-decoration: none; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; text-align: center;" href="http://localhost:5173/usuario/conta/compras" target="_blank"><span style="font-size: 16px;line-height: 0.16px;color:#000000;letter-spacing:-0.2px;font-weight:500;font-style:normal;display:inline-block;"><span style="display:inline-block;"><span style="font-family: 'Fira Sans', Arial, Helvetica, sans-serif;line-height: 1%;">Ver minha compra</span></span></span></a>
                                </td>
            </tr>
        </table>
        <![endif]-->
                <!--[if !mso]><!-- -->
                <a style="display: inline-block; box-sizing: border-box; border-radius: 6px 6px 6px 6px; background-color: #ffffff; padding: 10px 10px 10px 10px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="https://postcards.email/" target="_blank"><span style="font-size: 16px;line-height: 0.16px;color:#000000;letter-spacing:-0.2px;font-weight:500;font-style:normal;display:inline-block;"><span style="display:inline-block;"><span style="font-family: 'Fira Sans', Arial, Helvetica, sans-serif;line-height: 1%;">Ver minha compra</span></span></span></a>
                <!--<![endif]-->
               </th>
              </tr>
             </table>
             <table class="pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
              <tbody>
               <tr>
                <td align="left" valign="top" style="padding: 20px 10px 20px 0px; border-bottom: 1px solid #E5E5E5;">
                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tr>
                   <td valign="top" align="left">
                    <div class="pc-font-alt" style="text-decoration: none;">
                     <div style="font-size: 16px;line-height: 26.08px;text-align:left;text-align-last:left;color:#ffffff;letter-spacing:-0.2px;font-weight:700;font-style:normal;">
                      <div><span style="font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 18px; line-height: 156%;" class="pc-w620-font-size-16px pc-w620-line-height-163pc">Item</span>
                      </div>
                     </div>
                    </div>
                   </td>
                  </tr>
                 </table>
                </td>
                <td align="left" valign="top" style="padding: 20px 10px 20px 0px; border-bottom: 1px solid #E5E5E5;">
                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tr>
                   <td valign="top" align="right">
                    <div class="pc-font-alt" style="text-decoration: none;">
                     <div style="font-size: 16px;line-height: 26.08px;text-align:right;text-align-last:right;color:#ffffff;letter-spacing:-0.2px;font-weight:700;font-style:normal;">
                      <div><span style="font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 18px; line-height: 156%;" class="pc-w620-font-size-16px pc-w620-line-height-163pc">Qtde</span>
                      </div>
                     </div>
                    </div>
                   </td>
                  </tr>
                 </table>
                </td>
                <td align="left" valign="top" style="padding: 20px 0px 20px 0px; border-bottom: 1px solid #E5E5E5;">
                </td>
               </tr>
               ${products.map((p) => `<tr class="grid-produtos">
                <td align="left" valign="top" style="padding: 20px 10px 20px 0px; border-bottom: 1px solid #E5E5E5;">
                 <table class="pc-width-hug pc-w620-gridCollapsed-1" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tr class="pc-grid-tr-first pc-grid-tr-last">
                   <td class="pc-grid-td-first pc-w620-itemsSpacings-0-10" valign="top" style="padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 0px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                     <tr>
                      <td class="pc-w620-spacing-0-0-0-0" align="left" valign="top">
                       <img src=${p.images[0]} width="100" height="104" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 100px; height: 104px; border: 0; border-radius:10px; object-posittion:cover;" />
                      </td>
                     </tr>
                    </table>
                   </td>
                   <td class="pc-grid-td-last pc-w620-itemsSpacings-0-10" valign="top" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px;">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                     <tr>
                      <td align="left" valign="top">
                       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td valign="top" style="padding: 0px 0px 4px 0px;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                           <tr>
                            <td valign="top" align="left" style="padding: 9px 0px 0px 0px;">
                             <div class="pc-font-alt" style="text-decoration: none;">
                              <div style="font-size: 16px;line-height: 26.08px;text-align:left;text-align-last:left;color:#ffffff;letter-spacing:-0.3px;font-weight:600;font-style:normal;">
                               <div><span style="font-family: 'Bricolage Grotesque', Arial, Helvetica, sans-serif; font-size: 18px; line-height: 156%;" class="pc-w620-font-size-16px pc-w620-line-height-163pc">${p.name}</span>
                               </div>
                              </div>
                             </div>
                            </td>
                           </tr>
                          </table>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                     <tr>
                      <td align="left" valign="top">
                       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td valign="top" style="padding: 0px 0px 4px 0px;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                           <tr>
                            <td valign="top" align="left" style="padding: 9px 0px 0px 0px;">
                             <div class="pc-font-alt" style="text-decoration: none;">
                              <div style="font-size: 16px;line-height: 0.18px;text-align:left;text-align-last:left;color:#999999;letter-spacing:-0.3px;font-weight:500;font-style:normal;">
                               <div><span style="font-family: 'Bricolage Grotesque', Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1%;" class="pc-w620-font-size-16px pc-w620-line-height-163pc">R$ ${p.price}</span>
                               </div>
                              </div>
                             </div>
                            </td>
                           </tr>
                          </table>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                    </table>
                   </td>
                  </tr>
                 </table>
                </td>
                <td align="left" valign="top" style="padding: 20px 10px 20px 0px; border-bottom: 1px solid #E5E5E5;">
                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tr>
                   <td valign="top" align="right">
                    <div class="pc-font-alt" style="text-decoration: none;">
                     <div style="font-size: 16px;line-height: 20px;text-align:right;text-align-last:right;color:#9b9b9b;letter-spacing:-0.2px;font-weight:600;font-style:normal;">
                      <div><span style="font-family: 'Bricolage Grotesque', Arial, Helvetica, sans-serif; font-size: 18px; line-height: 122%;" class="pc-w620-font-size-16px pc-w620-line-height-125pc">1</span>
                      </div>
                     </div>
                    </div>
                   </td>
                  </tr>
                 </table>
                </td>
                <td align="left" valign="top" style="padding: 20px 0px 20px 0px; border-bottom: 1px solid #E5E5E5;">
                </td>
               </tr>`)}
              </tbody>
             </table>
             <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
               <td height="20" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
              </tr>
             </table>
             <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
               <td height="20" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
              </tr>
             </table>
             <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
               <td height="20" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
              </tr>
             </table>
             <table class="pc-width-fill pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
              <tbody>
               <tr align="right" valign="top">
                <td valign="top" style="width: 90%;">
                 <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                   <td style="padding: 0px 10px 0px 0px;" align="right">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                     <tr>
                      <td align="right" valign="top">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="pc-w620-width-auto" width="100%">
                        <tr>
                         <td valign="top" align="right">
                          <div class="pc-font-alt pc-w620-fontSize-22 pc-w620-lineHeight-145pc" style="line-height: 142%; letter-spacing: -0.4px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: bold; color: #fff; text-align: right; text-align-last: right;">
                           Total:</div>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                    </table>
                   </td>
                  </tr>
                 </table>
                </td>
                <td valign="top" style="width: 10%;">
                 <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                   <td style="padding: 0px 0px 0px 10px;" align="right">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                     <tr>
                      <td align="right" valign="top">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="pc-w620-width-auto" width="100%">
                        <tr>
                         <td valign="top" align="right">
                          <div class="pc-font-alt" style="text-decoration: none;">
                           <div style="font-size: 22px;line-height: 31.9px;text-align:right;text-align-last:right;color:#ffffff;letter-spacing:-0.4px;font-weight:700;font-style:normal;">
                            <div><span style="font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 24px; line-height: 142%;" class="pc-w620-font-size-22px pc-w620-line-height-145pc">R$ ${total}</span>
                            </div>
                           </div>
                          </div>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                    </table>
                   </td>
                  </tr>
                 </table>
                </td>
               </tr>
              </tbody>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
          </table>
         </td>
        </tr>
       </table>
      </td>
     </tr>
    </table>
   </td>
  </tr>
 </table>
</body>

</html>
`