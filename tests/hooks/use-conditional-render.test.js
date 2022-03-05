import { renderHook, act } from '@testing-library/preact-hooks';
import { useShowLabel } from '../../src/lib/hooks';

describe('Test conditional rendering', () => {
    test('default', () => {
        expect(true).toBe(true);
    })
});