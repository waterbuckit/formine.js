import { renderHook, act } from '@testing-library/preact-hooks';
import { h } from "preact";
import { SubmissionContext } from '../../src/lib/context';
import { useCheckboxComponent } from '../../src/lib/hooks';

describe('useCheckboxComponent hook', () => {
    test('check that default state is false', () => {
        const {result} = renderHook(() => useCheckboxComponent({}, {}))
    
        expect(result.current[0]).toBe(false);
    });

    test('check that initial state gets set on loaded values', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            values : {
                'test-checkbox' : true
            }
        }}>{children}</SubmissionContext.Provider>)
        const {result} = renderHook(() => useCheckboxComponent({ path : 'test-checkbox' }, {}), { wrapper })
    
        expect(result.current[0]).toBe(true);
    });

    test('check that attributes contains correct checked value', () => {
        const {result} = renderHook(() => useCheckboxComponent({defaultValue : true}, {value : "test"}))
    
        expect(result.current[2].checked).toBe(true);
    });

    test('check that attributes contains correct value', () => {
        const {result} = renderHook(() => useCheckboxComponent({defaultValue : true}, {value : "test"}))
    
        expect(result.current[2].value).toBe('test');
    });
});