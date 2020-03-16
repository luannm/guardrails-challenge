import ScanController from '../scan.controller';
import ScanModel from '../../models/Scan.model';

jest.mock('../../models/Scan.model', () => ({
  saveResult: jest.fn(),
}));


describe('ScanController', () => {
  let dateNowSpy;
  const mockRes = {
    json: jest.fn(),
    status: jest.fn(() => ({
      json: jest.fn(),
    })),
  };

  beforeAll(() => {
    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1487076708000);
  });

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('method: createScan', () => {
    it('should save data with correct payload', async () => {
      await ScanController.createScan({ body: {} }, mockRes);
      expect(ScanModel.saveResult).toHaveBeenCalledWith(null, {
        queuedAt: 1487076708000,
      });
    });
  });

  describe('method: updateScan', () => {
    it('should save data with scanningAt when status is IN_PROGRESS', async () => {
      const mockPayload = {
        id: 'test',
        status: 'In Progress',
      };
      await ScanController.updateScan({ body: mockPayload }, mockRes);
      expect(ScanModel.saveResult).toHaveBeenCalledWith(mockPayload.id, {
        ...mockPayload,
        scanningAt: 1487076708000,
      });
    });
    it('should save data with finishedAt when status is SUCCESS or FAILURE', async () => {
      const mockPayload = {
        id: 'test',
        status: 'Success',
      };
      await ScanController.updateScan({ body: mockPayload }, mockRes);
      expect(ScanModel.saveResult).toHaveBeenCalledWith(mockPayload.id, {
        ...mockPayload,
        finishedAt: 1487076708000,
      });
    });
  });
});
