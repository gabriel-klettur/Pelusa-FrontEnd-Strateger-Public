import { getTabClassName } from '../utils/helpers';

describe('getTabClassName', () => {
    it('should return the correct class for a disabled tab', () => {
        const result = getTabClassName({ selected: false, disabled: true });
        expect(result).toBe('cursor-not-allowed bg-gray-500 text-gray-500');
    });

    it('should return the correct class for a selected and enabled tab', () => {
        const result = getTabClassName({ selected: true, disabled: false });
        expect(result).toBe('hover:bg-african_violet-300 bg-african_violet-400 text-african_violet-900');
    });

    it('should return the correct class for a non-selected and enabled tab', () => {
        const result = getTabClassName({ selected: false, disabled: false });
        expect(result).toBe('hover:bg-african_violet-300 bg-african_violet-200 text-african_violet-700 hover:text-african_violet-900');
    });
});