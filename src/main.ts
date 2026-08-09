import "./style.css";
let currentStep: number = 1;
let selectedPlan: string = "Arcade";
let planPrice: number = 9;
let isYearly: boolean = false;
let onlineService: boolean = false;
let largerStorage: boolean = false;
let customProfile: boolean = false;
const step1 = document.querySelector<HTMLElement>("#step-content-1")!;
const step2 = document.querySelector<HTMLElement>("#step-content-2")!;
const step3 = document.querySelector<HTMLElement>("#step-content-3")!;
const step4 = document.querySelector<HTMLElement>("#step-content-4")!;
const steps = [step1, step2, step3, step4];
const nextBtn = document.querySelector<HTMLButtonElement>("#next-btn")!;
const backBtn = document.querySelector<HTMLButtonElement>("#back-btn")!;
const step1Btn = document.querySelector<HTMLButtonElement>("#step-1")!;
const step2Btn = document.querySelector<HTMLButtonElement>("#step-2")!;
const step3Btn = document.querySelector<HTMLButtonElement>("#step-3")!;
const step4Btn = document.querySelector<HTMLButtonElement>("#step-4")!;
const arcadeBtn = document.querySelector<HTMLButtonElement>("#plan-arcade")!;
const advancedBtn =
  document.querySelector<HTMLButtonElement>("#plan-advanced")!;
const proBtn = document.querySelector<HTMLButtonElement>("#plan-pro")!;
const billingToggle =
  document.querySelector<HTMLButtonElement>("#billing-toggle")!;
const planButtons = [arcadeBtn, advancedBtn, proBtn];
const onlineCheckbox =
  document.querySelector<HTMLInputElement>("#online-service")!;
const storageCheckbox =
  document.querySelector<HTMLInputElement>("#larger-storage")!;
const profileCheckbox =
  document.querySelector<HTMLInputElement>("#custom-profile")!;
const summaryPlan = document.querySelector<HTMLSpanElement>("#summary-plan")!;
const summaryPlanPrice = document.querySelector<HTMLSpanElement>(
  "#summary-plan-price",
)!;
const summaryOnline =
  document.querySelector<HTMLSpanElement>("#summary-online")!;
const summaryOnlinePrice = document.querySelector<HTMLSpanElement>(
  "#summary-online-price",
)!;
const summaryStorage =
  document.querySelector<HTMLSpanElement>("#summary-storage")!;
const summaryStoragePrice = document.querySelector<HTMLSpanElement>(
  "#summary-storage-price",
)!;
const summaryProfile =
  document.querySelector<HTMLSpanElement>("#summary-profile")!;
const summaryProfilePrice = document.querySelector<HTMLSpanElement>(
  "#summary-profile-price",
)!;
const totalPrice = document.querySelector<HTMLSpanElement>("#total-price")!;
function showStep(step: number): void {
  steps.forEach((item) => {
    item.classList.add("hidden");
  });
  steps[step - 1].classList.remove("hidden");
  if (step === 1) {
    backBtn.classList.add("hidden");
    nextBtn.textContent = "Next Step";
  }
  if (step === 2 || step === 3) {
    backBtn.classList.remove("hidden");
    nextBtn.textContent = "Next Step";
  }
  if (step === 4) {
    backBtn.classList.remove("hidden");
    nextBtn.textContent = "Confirm";
    updateSummary();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentStep < 4) {
    currentStep++;
    showStep(currentStep);
  }
});
backBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});
step1Btn.addEventListener("click", () => {
  currentStep = 1;
  showStep(currentStep);
});
step2Btn.addEventListener("click", () => {
  currentStep = 2;
  showStep(currentStep);
});
step3Btn.addEventListener("click", () => {
  currentStep = 3;
  showStep(currentStep);
});
step4Btn.addEventListener("click", () => {
  currentStep = 4;
  showStep(currentStep);
});
function selectPlan(
  button: HTMLButtonElement,
  plan: string,
  price: number
): void {
  planButtons.forEach((item) => {
    item.classList.remove(
      "border-[#483eff]",
      "bg-[#f0f6ff]"
    );
  });
  button.classList.add(
    "border-[#483eff]",
    "bg-[#f0f6ff]"
  );
  selectedPlan = plan;
  planPrice = isYearly
    ? price * 10
    : price;
}
arcadeBtn.addEventListener("click", () => {
  selectPlan(arcadeBtn, "Arcade", 9);
});
advancedBtn.addEventListener("click", () => {
  selectPlan(advancedBtn, "Advanced", 12);
});
proBtn.addEventListener("click", () => {
  selectPlan(proBtn, "Pro", 15);
});
billingToggle.addEventListener("click", () => {
  isYearly = !isYearly;
  if (selectedPlan === "Arcade") {
    planPrice = isYearly ? 90 : 9;
  }
  if (selectedPlan === "Advanced") {
    planPrice = isYearly ? 120 : 12;
  }
  if (selectedPlan === "Pro") {
    planPrice = isYearly ? 150 : 15;
  }
});
onlineCheckbox.addEventListener("change", () => {
  onlineService = onlineCheckbox.checked;
});
storageCheckbox.addEventListener("change", () => {
  largerStorage = storageCheckbox.checked;
});
profileCheckbox.addEventListener("change", () => {
  customProfile = profileCheckbox.checked;
});
function updateSummary(): void {
  summaryPlan.textContent = selectedPlan;
  summaryPlanPrice.textContent = isYearly
    ? `$${planPrice}/yr`
    : `$${planPrice}/mo`;
  summaryOnline.classList.toggle(
    "hidden",
    !onlineService
  );
  summaryOnlinePrice.classList.toggle(
    "hidden",
    !onlineService
  );
  summaryStorage.classList.toggle(
    "hidden",
    !largerStorage
  );
  summaryStoragePrice.classList.toggle(
    "hidden",
    !largerStorage
  );
  summaryProfile.classList.toggle(
    "hidden",
    !customProfile
  );
  summaryProfilePrice.classList.toggle(
    "hidden",
    !customProfile
  );
  summaryOnlinePrice.textContent = isYearly
    ? "+$10/yr"
    : "+$1/mo";
  summaryStoragePrice.textContent = isYearly
    ? "+$20/yr"
    : "+$2/mo";
  summaryProfilePrice.textContent = isYearly
    ? "+$20/yr"
    : "+$2/mo";
  let total: number = planPrice;
  if (onlineService) {
    total += isYearly ? 10 : 1;
  }
  if (largerStorage) {
    total += isYearly ? 20 : 2;
  }
  if (customProfile) {
    total += isYearly ? 20 : 2;
  }
  totalPrice.textContent = isYearly
    ? `$${total}/yr`
    : `$${total}/mo`;
}
showStep(currentStep);
selectPlan(
  arcadeBtn,
  "Arcade",
  9
);