import { renderHook, act } from '@testing-library/preact-hooks';
import { useShowLabel } from '../../src/lib/hooks';

describe('useShowLabel hook', () => {

    test('Returns array from useState with state true when showLabel true', () =>{
        const { result } = renderHook(() => useShowLabel(true, "text"));

        expect(result.current).toEqual(expect.arrayContaining([
            true, expect.any(Function)
        ]));
    });
    test('Hides if invalid type', () =>{
        const { result } = renderHook(() => useShowLabel(true, "button"));

        expect(result.current).toEqual(expect.arrayContaining([
            false, expect.any(Function)
        ]));
    }); 
});