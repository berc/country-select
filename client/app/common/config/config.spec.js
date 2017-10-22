import CommonModule from "../common.module";

describe('config singleton', () => {
  let config;

  beforeEach(window.module(CommonModule));

  beforeEach(inject((_config_) => {
    config = _config_;
  }));

  it('contains configurations', () => {
    // Assert
    expect(config.COUNTRIES_API_BASE).toEqual('/countries');
  });
});
