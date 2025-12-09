//:>--------------------------------------------------------------------------------------+
//:>
//:>  $Source: Enums.ts $
//:>
//:>  $Copyright: (c) 2017 Bentley Systems, Incorporated. All rights reserved. $
//:>
//:>+--------------------------------------------------------------------------------------
export var HoursTimespan;
(function (HoursTimespan) {
    HoursTimespan[HoursTimespan["LastHour"] = 1] = "LastHour";
    HoursTimespan[HoursTimespan["Last6Hours"] = 6] = "Last6Hours";
    HoursTimespan[HoursTimespan["Last24Hours"] = 24] = "Last24Hours";
    HoursTimespan[HoursTimespan["LastWeek"] = 168] = "LastWeek";
    HoursTimespan[HoursTimespan["Last2Weeks"] = 336] = "Last2Weeks";
    HoursTimespan[HoursTimespan["LastMonth"] = 744] = "LastMonth";
    HoursTimespan[HoursTimespan["LastQuarter"] = 2232] = "LastQuarter";
})(HoursTimespan || (HoursTimespan = {}));
export var Locations;
(function (Locations) {
    Locations[Locations["EastUs"] = 0] = "EastUs";
    Locations[Locations["CentralIndia"] = 1] = "CentralIndia";
    Locations[Locations["AustraliaEast"] = 2] = "AustraliaEast";
    Locations[Locations["NorthEurope"] = 3] = "NorthEurope";
    Locations[Locations["SoutheastAsia"] = 4] = "SoutheastAsia";
    Locations[Locations["UKSouth"] = 5] = "UKSouth";
    Locations[Locations["JapanEast"] = 6] = "JapanEast";
})(Locations || (Locations = {}));
