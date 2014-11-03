using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Code.GoogleApi.HolidaysCalendars
{
    public class CalendarCultureMaper
    {
        private static readonly Dictionary<string, CalendarInfo> _calendars = new Dictionary<string, CalendarInfo> {
            {"en-AU",new CalendarInfo(){Name="Australian Holidays",Calendar="en.australian#holiday@group.v.calendar.google.com",ShortCalendar="en.australian"}},
            {"de-AT",new CalendarInfo(){Name="Austrian Holidays",Calendar="en.austrian#holiday@group.v.calendar.google.com",ShortCalendar="en.austrian"}},
            {"en-BR",new CalendarInfo(){Name="Brazilian Holidays",Calendar="en.brazilian#holiday@group.v.calendar.google.com",ShortCalendar="en.brazilian"}},
            {"en-CA",new CalendarInfo(){Name="Canadian Holidays",Calendar="en.canadian#holiday@group.v.calendar.google.com",ShortCalendar="en.canadian"}},
            {"zh-CN",new CalendarInfo(){Name="China Holidays",Calendar="en.china#holiday@group.v.calendar.google.com",ShortCalendar="en.china"}},
            {"en",new CalendarInfo(){Name="Christian Holidays",Calendar="en.christian#holiday@group.v.calendar.google.com",ShortCalendar="en.christian"}},
            {"da-DK",new CalendarInfo(){Name="Danish Holidays",Calendar="en.danish#holiday@group.v.calendar.google.com",ShortCalendar="en.danish"}},
            {"nl-NL",new CalendarInfo(){Name="Dutch Holidays",Calendar="en.dutch#holiday@group.v.calendar.google.com",ShortCalendar="en.dutch"}},
            {"fi-FI",new CalendarInfo(){Name="Finnish Holidays",Calendar="en.finnish#holiday@group.v.calendar.google.com",ShortCalendar="en.finnish"}},
            {"fr-FR",new CalendarInfo(){Name="French Holidays",Calendar="en.french#holiday@group.v.calendar.google.com",ShortCalendar="en.french"}},
            {"de-DE",new CalendarInfo(){Name="German Holidays",Calendar="en.german#holiday@group.v.calendar.google.com",ShortCalendar="en.german"}},
            {"el-GR",new CalendarInfo(){Name="Greek Holidays",Calendar="en.greek#holiday@group.v.calendar.google.com",ShortCalendar="en.greek"}},
            {"zh-HK",new CalendarInfo(){Name="Hong Kong Holidays",Calendar="en.hong_kong#holiday@group.v.calendar.google.com",ShortCalendar="en.hong_kong"}},
            //{"zh-HK",new CalendarInfo(){Name="Hong Kong (C) Holidays",Calendar="en.hong_kong_c#holiday@group.v.calendar.google.com",ShortCalendar=""}},            
            {"gu-IN",new CalendarInfo(){Name="Indian Holidays",Calendar="en.indian#holiday@group.v.calendar.google.com",ShortCalendar="en.indian"}},
            {"id-ID",new CalendarInfo(){Name="Indonesian Holidays",Calendar="en.indonesian#holiday@group.v.calendar.google.com",ShortCalendar="en.indonesian"}},
            {"fa-IR",new CalendarInfo(){Name="Iranian Holidays",Calendar="en.iranian#holiday@group.v.calendar.google.com",ShortCalendar="en.iranian"}},
            {"en-IE",new CalendarInfo(){Name="Irish Holidays",Calendar="en.irish#holiday@group.v.calendar.google.com",ShortCalendar="en.irish"}},
            {"ar",new CalendarInfo(){Name="Islamic Holidays",Calendar="en.islamic#holiday@group.v.calendar.google.com",ShortCalendar="en.islamic"}},
            {"it-IT",new CalendarInfo(){Name="Italian Holidays",Calendar="en.italian#holiday@group.v.calendar.google.com",ShortCalendar="en.italian"}},
            {"ja-JP",new CalendarInfo(){Name="Japanese Holidays",Calendar="en.japanese#holiday@group.v.calendar.google.com",ShortCalendar="en.japanese"}},
            {"he-IL",new CalendarInfo(){Name="Jewish Holidays",Calendar="en.jewish#holiday@group.v.calendar.google.com",ShortCalendar="en.jewish"}},
            {"ms-MY",new CalendarInfo(){Name="Malaysian Holidays",Calendar="en.malaysia#holiday@group.v.calendar.google.com",ShortCalendar="en.malaysia"}},
            {"es-MX",new CalendarInfo(){Name="Mexican Holidays",Calendar="en.mexican#holiday@group.v.calendar.google.com",ShortCalendar="en.mexican"}},
            {"en-NZ",new CalendarInfo(){Name="New Zealand Holidays",Calendar="en.new_zealand#holiday@group.v.calendar.google.com",ShortCalendar="en.new_zealand"}},
            {"nb-NO",new CalendarInfo(){Name="Norwegian Holidays",Calendar="en.norwegian#holiday@group.v.calendar.google.com",ShortCalendar="en.norwegian"}},
            {"nn-NO",new CalendarInfo(){Name="Norwegian Holidays",Calendar="en.norwegian#holiday@group.v.calendar.google.com",ShortCalendar="en.norwegian"}},
            {"en-PH",new CalendarInfo(){Name="Philippines Holidays",Calendar="en.philippines#holiday@group.v.calendar.google.com",ShortCalendar="en.philippines"}},
            {"pl-PL",new CalendarInfo(){Name="Polish Holidays",Calendar="en.polish#holiday@group.v.calendar.google.com",ShortCalendar="en.polish"}},
            {"pt-BR",new CalendarInfo(){Name="Portuguese Holidays",Calendar="en.portuguese#holiday@group.v.calendar.google.com",ShortCalendar="en.portuguese"}},
            {"pt-PT",new CalendarInfo(){Name="Portuguese Holidays",Calendar="en.portuguese#holiday@group.v.calendar.google.com",ShortCalendar="en.portuguese"}},
            {"ru-RU",new CalendarInfo(){Name="Russian Holidays",Calendar="en.russian#holiday@group.v.calendar.google.com",ShortCalendar="en.russian"}},
            {"zh-SG",new CalendarInfo(){Name="Singapore Holidays",Calendar="en.singapore#holiday@group.v.calendar.google.com",ShortCalendar="en.singapore"}},
            {"en-ZA",new CalendarInfo(){Name="South Africa Holidays",Calendar="en.sa#holiday@group.v.calendar.google.com",ShortCalendar="en.sa#holiday"}},
            {"ko-KR",new CalendarInfo(){Name="South Korean Holidays",Calendar="en.south_korea#holiday@group.v.calendar.google.com",ShortCalendar="en.south_korea"}},
            {"es-ES",new CalendarInfo(){Name="Spain Holidays",Calendar="en.spain#holiday@group.v.calendar.google.com",ShortCalendar="en.spain"}},
            {"sv-SE",new CalendarInfo(){Name="Swedish Holidays",Calendar="en.swedish#holiday@group.v.calendar.google.com",ShortCalendar="en.swedish"}},
            {"zh-TW",new CalendarInfo(){Name="Taiwan Holidays",Calendar="en.taiwan#holiday@group.v.calendar.google.com",ShortCalendar="en.taiwan"}},
            {"th-TH",new CalendarInfo(){Name="Thai Holidays",Calendar="en.thai#holiday@group.v.calendar.google.com",ShortCalendar="en.thai"}},
            {"en-GB",new CalendarInfo(){Name="UK Holidays",Calendar="en.uk#holiday@group.v.calendar.google.com",ShortCalendar="en.uk"}},
            {"en-US",new CalendarInfo(){Name="US Holidays",Calendar="en.usa#holiday@group.v.calendar.google.com",ShortCalendar="en.usa"}},
            {"vi-VN",new CalendarInfo(){Name="Vietnamese Holidays",Calendar="en.vietnamese#holiday@group.v.calendar.google.com",ShortCalendar="en.vietnamese"}}            
        };

            //"en-US", "af", "af-ZA", "sq", "sq-AL", "gsw-FR", "am-ET", "ar", "ar-DZ", "ar-BH", "ar-EG", "ar-IQ", "ar-JO", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "ar-OM", "ar-QA", "ar-SA", "ar-SY", "ar-TN", "ar-AE", "ar-YE", "hy", "hy-AM", "as-IN", "az", "az-Cyrl-AZ", "az-Latn-AZ", "ba-RU", "eu", "eu-ES", "be", "be-BY", "bn-BD", "bn-IN", "bs-Cyrl-BA", "bs-Latn-BA", "br-FR", "bg", "bg-BG", "ca", "ca-ES", "zh-HK", "zh-MO", "zh-CN", "zh-Hans", "zh-SG", "zh-TW", "zh-Hant", "co-FR", "hr", "hr-HR", "hr-BA", "cs", "cs-CZ", "da", "da-DK", "prs-AF", "div", "div-MV", "nl", "nl-BE", "nl-NL", "en", "en-AU", "en-BZ", "en-CA", "en-029", "en-IN", "en-IE", "en-JM", "en-MY", "en-NZ", "en-PH", "en-SG", "en-ZA", "en-TT", "en-GB", "en-ZW", "et", "et-EE", "fo", "fo-FO", "fil-PH", "fi", "fi-FI", "fr", "fr-BE", "fr-CA", "fr-FR", "fr-LU", "fr-MC", "fr-CH", "fy-NL", "gl", "gl-ES", "ka", "ka-GE", "de", "de-AT", "de-DE", "de-LI", "de-LU", "de-CH", "el", "el-GR", "kl-GL", "gu", "gu-IN", "ha-Latn-NG", "he", "he-IL", "hi", "hi-IN", "hu", "hu-HU", "is", "is-IS", "ig-NG", "id", "id-ID", "iu-Latn-CA", "iu-Cans-CA", "ga-IE", "xh-ZA", "zu-ZA", "it", "it-IT", "it-CH", "ja", "ja-JP", "kn", "kn-IN", "kk", "kk-KZ", "km-KH", "qut-GT", "rw-RW", "sw", "sw-KE", "kok", "kok-IN", "ko", "ko-KR", "ky", "ky-KG", "lo-LA", "lv", "lv-LV", "lt", "lt-LT", "wee-DE", "lb-LU", "mk", "mk-MK", "ms", "ms-BN", "ms-MY", "ml-IN", "mt-MT", "mi-NZ", "arn-CL", "mr", "mr-IN", "moh-CA", "mn", "mn-MN", "mn-Mong-CN", "ne-NP", "no", "nb-NO", "nn-NO", "oc-FR", "or-IN", "ps-AF", "fa", "fa-IR", "pl", "pl-PL", "pt", "pt-BR", "pt-PT", "pa", "pa-IN", "quz-BO", "quz-EC", "quz-PE", "ro", "ro-RO", "rm-CH", "ru", "ru-RU", "smn-FI", "smj-NO", "smj-SE", "se-FI", "se-NO", "se-SE", "sms-FI", "sma-NO", "sma-SE", "sa", "sa-IN", "sr", "sr-Cyrl-BA", "sr-Cyrl-SP", "sr-Latn-BA", "sr-Latn-SP", "nso-ZA", "tn-ZA", "si-LK", "sk", "sk-SK", "sl", "sl-SI", "es", "es-AR", "es-BO", "es-CL", "es-CO", "es-CR", "es-DO", "es-EC", "es-SV", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PY", "es-PE", "es-PR", "es-ES", "es-US", "es-UY", "es-VE", "sv", "sv-FI", "sv-SE", "syr", "syr-SY", "tg-Cyrl-TJ", "tzm-Latn-DZ", "ta", "ta-IN", "tt", "tt-RU", "te", "te-IN", "th", "th-TH", "bo-CN", "tr", "tr-TR", "tk-TM", "ug-CN", "uk", "uk-UA", "wen-DE", "ur", "ur-PK", "uz", "uz-Cyrl-UZ", "uz-Latn-UZ", "vi", "vi-VN", "cy-GB", "wo-SN", "sah-RU", "ii-CN", "yo-NG" };

        public static string GetCalendarByCulture(string culture)
        {
            if (_calendars.ContainsKey(culture))
            {
                return _calendars[culture].ShortCalendar;
            }
            else
            {
                return _calendars["en"].ShortCalendar;
            }
            
        }
    }

    public class CalendarInfo{
        public string Name { get; set; }
        public string Calendar { get; set; }
        public string ShortCalendar { get; set; }
    }
}