import { jsx as _jsx } from "react/jsx-runtime";
import { shallow } from "enzyme";
import { SnackbarProvider } from 'notistack';
import { InvalidJobsFromPools } from "../components/InvalidJobsFromPools";
describe("Test InvalidJobsFromPools Component", () => {
    const props = {
        title: "Invalid jobs from pools",
        getJobReportUrl: "",
        getActiveJobUrl: "",
        getCancelJobUrl: jest.fn(),
        showFilters: true,
        showTimeFilter: true,
        showLocationFilter: true,
        timeFilterOptions: [],
        locationFilterOptions: [],
        defaultTimeFilterOption: { value: "", label: "" },
        defaultlocationFilterOptions: { value: "", label: "" }
    };
    it("Should render InvalidJobsFromPools Component", () => {
        const wrapper = shallow(_jsx(SnackbarProvider, { children: _jsx(InvalidJobsFromPools, { ...props }) }));
        expect(wrapper).toMatchSnapshot();
    });
});
