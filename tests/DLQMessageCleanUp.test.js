import { jsx as _jsx } from "react/jsx-runtime";
import { shallow } from "enzyme";
import { SnackbarProvider } from 'notistack';
import { DLQMessageCleanUp } from "../components/DLQMessageCleanUp";
describe("Test DLQMesssageCleanUp Component", () => {
    const props = {
        title: "Queues",
        queues: ["jobMessage", "nodeMessage"],
        controllerBaseUrl: "",
        getDeleteDlqMsgUrl: jest.fn()
    };
    it("Should render DLQMesssageCleanUp Component", () => {
        const wrapper = shallow(_jsx(SnackbarProvider, { children: _jsx(DLQMessageCleanUp, { ...props }) }));
        expect(wrapper).toMatchSnapshot();
    });
});
