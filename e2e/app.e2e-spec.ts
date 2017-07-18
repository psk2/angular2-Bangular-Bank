import { BangularBankPage } from './app.po';

describe('bangular-bank App', () => {
  let page: BangularBankPage;

  beforeEach(() => {
    page = new BangularBankPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
