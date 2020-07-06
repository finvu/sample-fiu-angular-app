import { AaOnboardingLayoutModule } from './aa-onboarding-layout.module';

describe('AaOnboardingLayoutModule', () => {
  let aaOnboardingLayoutModule: AaOnboardingLayoutModule;

  beforeEach(() => {
    aaOnboardingLayoutModule = new AaOnboardingLayoutModule();
  });

  it('should create an instance', () => {
    expect(aaOnboardingLayoutModule).toBeTruthy();
  });
});
