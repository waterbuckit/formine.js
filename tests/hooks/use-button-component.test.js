import { renderHook, act } from '@testing-library/preact-hooks';
import { useButtonComponent } from '../../src/lib/hooks';

describe('useButtonComponent hook', () => {
    test('Defaults to button type when no attribute passed for type', () => {
        const { result } = renderHook(() => useButtonComponent({}));

        expect(result.current[1]).toBe("button");
    });
    test('Defaults to button if type not submit or reset', () => {
        const { result } = renderHook(() => useButtonComponent({attributes : { type : "asdasdak"}}));

        expect(result.current[1]).toBe("button");
    });
    test('Allows button to be typed as a submit', () => {
        const { result } = renderHook(() => useButtonComponent({attributes : { type : "submit"}}));

        expect(result.current[1]).toBe("submit");
    });
    test('Returns array with hooks and type', () => {
        const { result } = renderHook(() => useButtonComponent({}));

        expect(result.current).toEqual(expect.arrayContaining([
            expect.any(Object),
            expect.stringContaining('button')
        ]));
    });
});