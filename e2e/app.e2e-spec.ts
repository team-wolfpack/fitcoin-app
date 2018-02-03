import { FitcoinAppPage } from './app.po';

describe('fitcoin-app App', function() {
  let page: FitcoinAppPage;

  beforeEach(() => {
    page = new FitcoinAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
