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
const thankYou = document.querySelector<HTMLElement>("#thank-you")!;
const steps: HTMLElement[] = [step1, step2, step3, step4];
const step1Btn = document.querySelector<HTMLButtonElement>("#step-1")!;
const step2Btn = document.querySelector<HTMLButtonElement>("#step-2")!;
const step3Btn = document.querySelector<HTMLButtonElement>("#step-3")!;
const step4Btn = document.querySelector<HTMLButtonElement>("#step-4")!;
const nextBtn = document.querySelector<HTMLButtonElement>("#next-btn")!;
const nextBtn2 = document.querySelector<HTMLButtonElement>("#next-btn-2")!;
const nextBtn3 = document.querySelector<HTMLButtonElement>("#next-btn-3")!;
const backBtn3 = document.querySelector<HTMLButtonElement>("#back-btn-3")!;
const backBtn4 = document.querySelector<HTMLButtonElement>("#back-btn-4")!;
const confirmBtn = document.querySelector<HTMLButtonElement>("#confirm-btn")!;
function showStep(step: number): void {
  steps.forEach((item) => {
    item.classList.add("hidden");
  });
  thankYou.classList.add("hidden");
  steps[step - 1].classList.remove("hidden");
  currentStep = step;
}
showStep(1);
function validateStep1(): boolean {
  const name = document.querySelector<HTMLInputElement>("#name")!;
  const email = document.querySelector<HTMLInputElement>("#email")!;
  const phone = document.querySelector<HTMLInputElement>("#phone")!;
  let valid = true;
  [name, email, phone].forEach((input) => {
    input.classList.remove("border-red-500");
    if (input.value.trim() === "") {
      input.classList.add("border-red-500");
      valid = false;
    }
  });
  return valid;
}
nextBtn.addEventListener("click", () => {
  if (!validateStep1()) {
    return;
  }
  showStep(2);
});
nextBtn2.addEventListener("click", () => {
  showStep(3);
});
nextBtn3.addEventListener("click", () => {
  updateSummary();
  showStep(4);
});
backBtn3.addEventListener("click", () => {
  showStep(2);
});
backBtn4.addEventListener("click", () => {
  showStep(3);
});
step1Btn.addEventListener("click", () => {
  showStep(1);
});
step2Btn.addEventListener("click", () => {
  showStep(2);
});
step3Btn.addEventListener("click", () => {
  showStep(3);
});
step4Btn.addEventListener("click", () => {
  updateSummary();
  showStep(4);
});
const arcadeBtn = document.querySelector<HTMLButtonElement>("#plan-arcade")!;
const advancedBtn =
  document.querySelector<HTMLButtonElement>("#plan-advanced")!;
const proBtn = document.querySelector<HTMLButtonElement>("#plan-pro")!;
const planButtons: HTMLButtonElement[] = [arcadeBtn, advancedBtn, proBtn];
const billingToggle =
  document.querySelector<HTMLButtonElement>("#billing-toggle")!;
const billingCircle =
  document.querySelector<HTMLSpanElement>("#billing-circle")!;
const monthlyLabel = document.querySelector<HTMLSpanElement>("#monthly-label")!;
const yearlyLabel = document.querySelector<HTMLSpanElement>("#yearly-label")!;
const arcadePrice =
  document.querySelector<HTMLParagraphElement>("#arcade-price")!;
const advancedPrice =
  document.querySelector<HTMLParagraphElement>("#advanced-price")!;
const proPrice = document.querySelector<HTMLParagraphElement>("#pro-price")!;
const arcadeFree =
  document.querySelector<HTMLParagraphElement>("#arcade-free")!;
const advancedFree =
  document.querySelector<HTMLParagraphElement>("#advanced-free")!;
const proFree = document.querySelector<HTMLParagraphElement>("#pro-free")!;
function selectPlan(
  button: HTMLButtonElement,
  plan: string,
  monthlyPrice: number,
): void {
  planButtons.forEach((item) => {
    item.classList.remove("border-[#483eff]", "bg-[#f0f6ff]");
  });
  button.classList.add("border-[#483eff]", "bg-[#f0f6ff]");
  selectedPlan = plan;
  planPrice = isYearly ? monthlyPrice * 10 : monthlyPrice;
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
  if (isYearly) {
    billingCircle.classList.add("translate-x-[20px]");
    monthlyLabel.classList.remove("font-bold", "text-[#02295a]");
    monthlyLabel.classList.add("text-gray-500");
    yearlyLabel.classList.remove("text-gray-500");
    yearlyLabel.classList.add("font-bold", "text-[#02295a]");
    arcadePrice.textContent = "$90/yr";
    advancedPrice.textContent = "$120/yr";
    proPrice.textContent = "$150/yr";
    arcadeFree.classList.remove("hidden");
    advancedFree.classList.remove("hidden");
    proFree.classList.remove("hidden");
    if (selectedPlan === "Arcade") {
      planPrice = 90;
    } else if (selectedPlan === "Advanced") {
      planPrice = 120;
    } else {
      planPrice = 150;
    }
  } else {
    billingCircle.classList.remove("translate-x-[20px]");
    monthlyLabel.classList.remove("text-gray-500");
    monthlyLabel.classList.add("font-bold", "text-[#02295a]");
    yearlyLabel.classList.remove("font-bold", "text-[#02295a]");
    yearlyLabel.classList.add("text-gray-500");
    arcadePrice.textContent = "$9/mo";
    advancedPrice.textContent = "$12/mo";
    proPrice.textContent = "$15/mo";
    arcadeFree.classList.add("hidden");
    advancedFree.classList.add("hidden");
    proFree.classList.add("hidden");
    if (selectedPlan === "Arcade") {
      planPrice = 9;
    } else if (selectedPlan === "Advanced") {
      planPrice = 12;
    } else {
      planPrice = 15;
    }
  }
  updateSummary();
});
selectPlan(arcadeBtn, "Arcade", 9);
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
const summaryOnlineRow = document.querySelector<HTMLElement>(
  "#summary-online-row",
)!;
const summaryStorageRow = document.querySelector<HTMLElement>(
  "#summary-storage-row",
)!;
const summaryProfileRow = document.querySelector<HTMLElement>(
  "#summary-profile-row",
)!;
const summaryOnlinePrice = document.querySelector<HTMLSpanElement>(
  "#summary-online-price",
)!;
const summaryStoragePrice = document.querySelector<HTMLSpanElement>(
  "#summary-storage-price",
)!;
const summaryProfilePrice = document.querySelector<HTMLSpanElement>(
  "#summary-profile-price",
)!;
const totalPrice = document.querySelector<HTMLSpanElement>("#total-price")!;
const changePlan = document.querySelector<HTMLButtonElement>("#change-plan")!;
onlineCheckbox.addEventListener("change", () => {
  onlineService = onlineCheckbox.checked;
  updateSummary();
});
storageCheckbox.addEventListener("change", () => {
  largerStorage = storageCheckbox.checked;
  updateSummary();
});
profileCheckbox.addEventListener("change", () => {
  customProfile = profileCheckbox.checked;
  updateSummary();
});
function updateSummary(): void {
  summaryPlan.textContent = selectedPlan;
  summaryPlanPrice.textContent = isYearly
    ? `$${planPrice}/yr`
    : `$${planPrice}/mo`;
  let total: number = planPrice;
  if (onlineService) {
    summaryOnlineRow.classList.remove("hidden");
    summaryOnlinePrice.textContent = isYearly ? "+$10/yr" : "+$1/mo";
    total += isYearly ? 10 : 1;
  } else {
    summaryOnlineRow.classList.add("hidden");
  }
  if (largerStorage) {
    summaryStorageRow.classList.remove("hidden");
    summaryStoragePrice.textContent = isYearly ? "+$20/yr" : "+$2/mo";
    total += isYearly ? 20 : 2;
  } else {
    summaryStorageRow.classList.add("hidden");
  }
  if (customProfile) {
    summaryProfileRow.classList.remove("hidden");
    summaryProfilePrice.textContent = isYearly ? "+$20/yr" : "+$2/mo";
    total += isYearly ? 20 : 2;
  } else {
    summaryProfileRow.classList.add("hidden");
  }
  totalPrice.textContent = isYearly ? `$${total}/yr` : `$${total}/mo`;
}
changePlan.addEventListener("click", () => {
  showStep(2);
});
confirmBtn.addEventListener("click", () => {
  step4.classList.add("hidden");
  thankYou.classList.remove("hidden");
});
updateSummary();