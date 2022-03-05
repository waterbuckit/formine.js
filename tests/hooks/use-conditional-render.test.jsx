import { renderHook, act } from '@testing-library/preact-hooks';
import { h } from "preact";
import { SubmissionContext } from '../../src/lib/context';
import { useConditionalRender, useShowLabel } from '../../src/lib/hooks';

describe('Test conditional rendering', () => {
    test('component renders with no conditions', () => {
        const { result } = renderHook(() => useConditionalRender([]));

        expect(result.current[0]).toBe(true);
    })

    test('component does not render when default show is false', () => {
        const { result } = renderHook(() => useConditionalRender([], false));

        expect(result.current[0]).toBe(false);
    })

    test('component renders when simple condition (=) is met to render it ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {
                'test-field' : 'hello'
            },
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    {
                        op: "==",
                        value: "hello",
                        path: "test-field",
                    },
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(true);
    })

    test('component does not render when simple condition (=) is not met to render it ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {
                'test-field' : 'goodbye'
            },
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    {
                        op: "==",
                        value: "hello",
                        path: "test-field",
                    },
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(false);
    })

    test('component renders when simple condition (!=) is met to render it ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {
                'test-field' : 'goodbye'
            },
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    {
                        op: "!=",
                        value: "hello",
                        path: "test-field",
                    },
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(true);
    })

    test('component renders when multiple conditions are met to render it ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {
                'test-field' : 'hello',
                'test-field-2' : 'goodbye'
            },
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    {
                        op: "&&",
                        conditions : [
                            {
                                op : '==',
                                value : 'hello',
                                path : 'test-field'
                            },
                            {
                                op : '==',
                                value : 'goodbye',
                                path : 'test-field-2'
                            }
                        ]
                    },
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(true);
    })

    test('component does not render when multiple conditions are not met to render it ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {
                'test-field' : 'hello',
                'test-field-2' : 'hello'
            },
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    {
                        op: "&&",
                        conditions : [
                            {
                                op : '==',
                                value : 'hello',
                                path : 'test-field'
                            },
                            {
                                op : '==',
                                value : 'goodbye',
                                path : 'test-field-2'
                            }
                        ]
                    },
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(false);
    })

    test('component renders when function condition is met ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {},
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    (submission) => true
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(true);
    })

    test('component does not render with multiple functions where one returns false ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {},
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    (submission) => true,
                    (submission) => false,
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(false);
    })

    test('component renders with multiple condition types ', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {
                'test-field' : 'hello',
                'test-field-2' : 'goodbye'
            },
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    (submission) => submission['test-field'] == 'hello',
                    {
                        op : '==',
                        value : 'goodbye',
                        path  : 'test-field-2' 
                    }
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(true);
    })

    test('component does not render with multiple condition types where one should fail', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {
                'test-field' : 'hello',
                'test-field-2' : 'goodbye'
            },
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    (submission) => submission['test-field'] == 'hello',
                    {
                        op : '==',
                        value : 'hello',
                        path  : 'test-field-2' 
                    }
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(false);
    })

    test('component renders with string encoded function that should return true', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {},
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    '(submission) => true'
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(true);
    });

    test('component renders with string encoded function that should return false', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            submission: {},
        }}>{children}</SubmissionContext.Provider>)

        const { result } = renderHook(
            () =>
                useConditionalRender([
                    '(submission) => false'
                ], true),
            { wrapper }
        );

        expect(result.current[0]).toBe(false);
    });
});