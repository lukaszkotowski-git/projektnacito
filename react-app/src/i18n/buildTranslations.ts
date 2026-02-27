import { pl, Translations } from './pl'

export interface DirectusSection {
  section: string;
  data: Record<string, unknown>;
}

function parseArray<T>(raw: unknown, fallback: T[]): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as T[]; } catch { return fallback; }
  }
  return fallback;
}

export function buildTranslations(sections: DirectusSection[] | null | undefined): Translations {
  const map: Record<string, Record<string, unknown>> = {};
  const safe = sections ?? [];
  for (const s of safe) {
    map[s.section] = s.data;
  }

  const common = { ...pl.common, ...(map['common'] ?? {}) } as Translations['common'];
  const nav = { ...pl.nav, ...(map['nav'] ?? {}) } as Translations['nav'];
  const main = { ...pl.main, ...(map['main'] ?? {}) } as Translations['main'];
  const consult = { ...pl.consult, ...(map['consult'] ?? {}) } as Translations['consult'];
  const success = { ...pl.success, ...(map['success'] ?? {}) } as Translations['success'];
  const about = { ...pl.about, ...(map['about'] ?? {}) } as Translations['about'];
  const footer = { ...pl.footer, ...(map['footer'] ?? {}) } as Translations['footer'];
  const aria = { ...pl.aria, ...(map['aria'] ?? {}) } as Translations['aria'];

  const mergedCito = { ...pl.cito, ...(map['cito'] ?? {}) };
  const cito: Translations['cito'] = {
    ...(mergedCito as Translations['cito']),
    summaryItems: parseArray(mergedCito.summaryItems, pl.cito.summaryItems),
  };

  const mergedPremium = { ...pl.premium, ...(map['premium'] ?? {}) };
  const rawRKA = mergedPremium.removeKitchenAriaLabel;
  const removeKitchenAriaLabel: Translations['premium']['removeKitchenAriaLabel'] =
    typeof rawRKA === 'string'
      ? (idx: number) => (rawRKA as string).replace('{{index1}}', String(idx + 1))
      : pl.premium.removeKitchenAriaLabel;
  const rawRBA = mergedPremium.removeBathAriaLabel;
  const removeBathAriaLabel: Translations['premium']['removeBathAriaLabel'] =
    typeof rawRBA === 'string'
      ? (idx: number) => (rawRBA as string).replace('{{index1}}', String(idx + 1))
      : pl.premium.removeBathAriaLabel;
  const rawKA = mergedPremium.kitchenAriaLabel;
  const kitchenAriaLabel: Translations['premium']['kitchenAriaLabel'] =
    typeof rawKA === 'string'
      ? (idx: number) => (rawKA as string).replace('{{index1}}', String(idx + 1))
      : pl.premium.kitchenAriaLabel;
  const rawBA = mergedPremium.bathAriaLabel;
  const bathAriaLabel: Translations['premium']['bathAriaLabel'] =
    typeof rawBA === 'string'
      ? (idx: number) => (rawBA as string).replace('{{index1}}', String(idx + 1))
      : pl.premium.bathAriaLabel;
  const premium: Translations['premium'] = {
    ...(mergedPremium as Translations['premium']),
    summaryItems: parseArray(mergedPremium.summaryItems, pl.premium.summaryItems),
    removeKitchenAriaLabel,
    removeBathAriaLabel,
    kitchenAriaLabel,
    bathAriaLabel,
  };

  const mergedFinalStep = { ...pl.finalStep, ...(map['finalStep'] ?? {}) };
  const rawSub = mergedFinalStep.subtitle;
  const subtitle: Translations['finalStep']['subtitle'] =
    typeof rawSub === 'string'
      ? (packageName: string) => (rawSub as string).replace('{{packageName}}', packageName)
      : pl.finalStep.subtitle;
  const finalStep: Translations['finalStep'] = {
    ...(mergedFinalStep as Translations['finalStep']),
    subtitle,
  };

  const mergedOfferOverview = { ...pl.offerOverview, ...(map['offerOverview'] ?? {}) };
  const offerOverview: Translations['offerOverview'] = {
    ...(mergedOfferOverview as Translations['offerOverview']),
    citoItems: parseArray(mergedOfferOverview.citoItems, pl.offerOverview.citoItems),
    premiumItems: parseArray(mergedOfferOverview.premiumItems, pl.offerOverview.premiumItems),
    consultItems: parseArray(mergedOfferOverview.consultItems, pl.offerOverview.consultItems),
  };

  return {
    common,
    nav,
    main,
    cito,
    premium,
    consult,
    finalStep,
    success,
    about,
    offerOverview,
    footer,
    aria,
  };
}
