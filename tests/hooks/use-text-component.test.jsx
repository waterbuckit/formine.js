import { renderHook, act } from '@testing-library/preact-hooks';
import { SubmissionContext } from '../../src/lib/context';
import { h } from 'preact';
import { useTextComponent } from '../../src/lib/hooks';

describe('useTextComponent hook', () => {
    test('Leaves default value when not passed as prop', () => {
        const { result } = renderHook(() => useTextComponent({}));

        expect(result.current[0]).toBe("");
    });
    test('Sets default value when passed as prop', () => {
        const { result } = renderHook(() => useTextComponent({defaultValue : "Hello"}));

        expect(result.current[0]).toBe("Hello");
    });
    test('Returns array with value, setValue and object with props and hooks', () => {
        const { result } = renderHook(() => useTextComponent({}));

        expect(result.current).toEqual(expect.arrayContaining([
            expect.anything(), expect.any(Function), expect.objectContaining({
                value : expect.anything(),
                onChange : expect.any(Function),
                onInput : expect.any(Function),
            })
        ]))
    });
    test('Returns an array with index 2 object with correct hooks when no props passed', () => {
        const { result } = renderHook(() => useTextComponent({}));
        
        expect(result.current[2]).toEqual(expect.objectContaining({
            value : expect.anything(),
            onChange : expect.any(Function),
            onInput : expect.any(Function),
        }));
    });
    test('Returns array with index 2 object with correct hooks when onClick passed', () => {
        const { result } = renderHook(() => useTextComponent({hooks : { onClick : () => {}}}));
        
        expect(result.current[2]).toEqual(expect.objectContaining({
            value : expect.anything(),
            onChange : expect.any(Function),
            onInput : expect.any(Function),
            onClick : expect.any(Function),
        }));
    });

    test('Check that initial state gets set on loaded values', () => {
        const wrapper = ({children}) => (<SubmissionContext.Provider value={{
            values : {
                'test-textfield' : 'hello'
            }
        }}>{children}</SubmissionContext.Provider>)
        const {result} = renderHook(() => useTextComponent({ path : 'test-textfield' }), { wrapper })
    
        expect(result.current[0]).toBe('hello');
    });
});