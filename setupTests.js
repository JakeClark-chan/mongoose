//:>--------------------------------------------------------------------------------------+
//:>
//:>  $Source: setupTests.ts $
//:>
//:>  $Copyright: (c) 2017 Bentley Systems, Incorporated. All rights reserved. $
//:>
//:>+--------------------------------------------------------------------------------------
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import enzyme from "enzyme";
enzyme.configure({ adapter: new Adapter() });
jest.mock("./utils/UseFetchApi", () => {
    const useFetchApi = jest.requireActual("./utils/UseFetchApi");
    return {
        ...useFetchApi,
        useFetchApi: jest.fn()
    };
});
jest.mock("notistack", () => {
    const notistackProps = jest.requireActual("notistack");
    return {
        ...notistackProps,
        useSnackbar: jest.fn()
    };
});
jest.mock("@itwin/itwinui-react", () => {
    const props = jest.requireActual("@itwin/itwinui-react");
    return {
        ...props
    };
});
jest.mock("./utils/UseJobReport", () => {
    const props = jest.requireActual("./utils/UseJobReport");
    return {
        ...props,
        useJobReport: jest.fn()
    };
});
