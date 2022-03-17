import { renderHook, act } from '@testing-library/preact-hooks';
import { h } from "preact";
import { SubmissionContext } from '../../src/lib/context';
import { useCheckboxFieldsetComponent } from '../../src/lib/hooks';

describe('useCheckboxFieldsetComponent hook', () => {
    test('check that default state is an empty object', () => {
        const {result} = renderHook(() => useCheckboxFieldsetComponent([], {}))
    
        expect(result.current[0]).toEqual({});
    });

    test('check that initial state gets set on loaded values', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            values : {
                'test-checkbox' : {
                    "Hello" : true,
                }
            }
        }}>{children}</SubmissionContext.Provider>)
        const {result} = renderHook(() => useCheckboxFieldsetComponent([
            { value : "hello", label : "Hello" }
        ], { path : 'test-checkbox'}), { wrapper })
    
        expect(result.current[0]).toEqual({
            "Hello" : true
        });
    });

    test('check that initial state gets set on multiple loaded values', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            values : {
                'test-checkbox' : {
                    "hello" : "hello",
                    "goodbye" : false,
                    "good-afternoon" : "good-afternoon"
                }
            }
        }}>{children}</SubmissionContext.Provider>)
        const {result} = renderHook(() => useCheckboxFieldsetComponent([
            { value : "hello", label : "Hello" },
            { value : "good-afternoon", label : "Good Afternoon" },
            { value : "goodbye", label : "Goodbye" }
        ], { path : 'test-checkbox'}), { wrapper })
    
        console.log(result.current[0]);

        expect(result.current[0]).toEqual({
            "hello" : "hello",
            "goodbye" : false,
            "good-afternoon" : "good-afternoon"
        });
    });
});