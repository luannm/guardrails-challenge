import ScanModel from '../Scan.model';
import MOCK_DATA from './mock-firebase-data.json';

const mockGetListResponse = jest.fn();
const mockGetDetailsResponse = jest.fn();
const mockAddResponse = jest.fn();
const mockSetResponse = jest.fn();

// Mock firebase
jest.mock('../../services/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: mockGetDetailsResponse,
        set: mockSetResponse,
      })),
      get: mockGetListResponse,
      add: mockAddResponse,
    })),
  },
}));

describe('ScanModel', () => {
  describe('method: getList', () => {
    it('should return data when fetching successfully', async () => {
      mockGetListResponse.mockResolvedValue([
        {
          id: MOCK_DATA[0].id,
          data: () => MOCK_DATA[0],
        },
        {
          id: MOCK_DATA[1].id,
          data: () => MOCK_DATA[1],
        },
      ]);
      const data = await ScanModel.getList();
      expect(data).toEqual(MOCK_DATA);
    });
  });

  describe('method: getDetails', () => {
    it('should throw error if missing id param', async () => {
      try {
        await ScanModel.getDetails();
      } catch (error) {
        expect(error.message).toBe('Missing ID');
      }
    });
    it('should throw error if document not exists', async () => {
      mockGetDetailsResponse.mockResolvedValue({ exists: false });
      try {
        await ScanModel.getDetails('123abc');
      } catch (error) {
        expect(error.message).toBe('Scan result is empty');
      }
    });
    it('should return data when fetching successfully', async () => {
      mockGetDetailsResponse.mockResolvedValue({
        exists: true,
        id: MOCK_DATA[0].id,
        data: () => MOCK_DATA[0],
      });
      const data = await ScanModel.getDetails('123abc');
      expect(data).toEqual(MOCK_DATA[0]);
    });
  });

  describe('method: saveResult', () => {
    it('should throw error if missing required data', async () => {
      try {
        await ScanModel.saveResult(null, {});
      } catch (error) {
        expect(error.message).toBe('Missing required params');
      }
    });
    it('should create new record if dont have id field in payload', async () => {
      mockAddResponse.mockResolvedValue({
        id: MOCK_DATA[0].id,
      });
      const mockPayload = MOCK_DATA[0];
      const data = await ScanModel.saveResult(null, mockPayload);
      expect(data).toEqual(MOCK_DATA[0]);
      expect(mockAddResponse).toHaveBeenCalled();
    });
    it('should update existing record if have id field in payload', async () => {
      mockSetResponse.mockResolvedValue({
        id: MOCK_DATA[0].id,
      });
      const mockPayload = MOCK_DATA[0];
      const data = await ScanModel.saveResult(mockPayload.id, mockPayload);
      expect(data).toEqual(MOCK_DATA[0]);
      expect(mockSetResponse).toHaveBeenCalled();
    });
  });
});
