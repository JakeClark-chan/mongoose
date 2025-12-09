import { jsx as _jsx } from "react/jsx-runtime";
import { shallow } from "enzyme";
import { SnackbarProvider } from 'notistack';
import Selector from "../components/Selector";
describe("Test Selector Component", () => {
    const props = {
        default: { value: "", label: "" },
        onValueChanged: jest.fn(),
        label: "label",
        options: [],
        style: jest.fn()
    };
    it("Should render Selector Component", () => {
        const wrapper = shallow(_jsx(SnackbarProvider, { children: _jsx(Selector, { ...props }) }));
        expect(wrapper).toMatchSnapshot();
    });
});
