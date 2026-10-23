export interface PincodeInfo {
  pinCode: string;
  city: string;
  district: string;
  state: 'Tamil Nadu';
  deliveryDays: string;
  expressAvailable: boolean;
  codAvailable: boolean;
}

// Major Tamil Nadu Pincode ranges and prominent hub points
export const TN_PINCODE_MAP: Record<string, { city: string; district: string; deliveryDays: string; express: boolean }> = {
  // Chennai (600xxx)
  '600001': { city: 'Chennai (George Town)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600002': { city: 'Chennai (Mount Road)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600004': { city: 'Chennai (Mylapore)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600017': { city: 'Chennai (T. Nagar)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600028': { city: 'Chennai (R.A. Puram)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600034': { city: 'Chennai (Nungambakkam)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600040': { city: 'Chennai (Anna Nagar)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600096': { city: 'Chennai (Perungudi / OMR)', district: 'Chennai', deliveryDays: '24 Hours', express: true },
  '600100': { city: 'Chennai (Medavakkam)', district: 'Chengalpattu', deliveryDays: '24-48 Hours', express: true },
  
  // Coimbatore (641xxx)
  '641001': { city: 'Coimbatore (RS Puram)', district: 'Coimbatore', deliveryDays: '24-48 Hours', express: true },
  '641004': { city: 'Coimbatore (Peelamedu)', district: 'Coimbatore', deliveryDays: '24-48 Hours', express: true },
  '641012': { city: 'Coimbatore (Gandhipuram)', district: 'Coimbatore', deliveryDays: '24-48 Hours', express: true },
  '641018': { city: 'Coimbatore (Race Course)', district: 'Coimbatore', deliveryDays: '24-48 Hours', express: true },
  '641046': { city: 'Coimbatore (Saravanampatti)', district: 'Coimbatore', deliveryDays: '24-48 Hours', express: true },

  // Tiruppur (Textile Capital of India - Hub)
  '641601': { city: 'Tiruppur (Town)', district: 'Tiruppur', deliveryDays: 'Same Day / 24 Hours', express: true },
  '641602': { city: 'Tiruppur (College Rd)', district: 'Tiruppur', deliveryDays: 'Same Day / 24 Hours', express: true },
  '641604': { city: 'Tiruppur (PN Road)', district: 'Tiruppur', deliveryDays: 'Same Day / 24 Hours', express: true },

  // Madurai (625xxx)
  '625001': { city: 'Madurai (Central)', district: 'Madurai', deliveryDays: '1-2 Days', express: true },
  '625020': { city: 'Madurai (KK Nagar)', district: 'Madurai', deliveryDays: '1-2 Days', express: true },

  // Tiruchirappalli / Trichy (620xxx)
  '620001': { city: 'Tiruchirappalli (Cantonment)', district: 'Tiruchirappalli', deliveryDays: '1-2 Days', express: true },
  '620018': { city: 'Tiruchirappalli (Thillai Nagar)', district: 'Tiruchirappalli', deliveryDays: '1-2 Days', express: true },

  // Salem (636xxx)
  '636001': { city: 'Salem (Town)', district: 'Salem', deliveryDays: '1-2 Days', express: true },
  '636007': { city: 'Salem (Fairlands)', district: 'Salem', deliveryDays: '1-2 Days', express: true },

  // Erode (638xxx)
  '638001': { city: 'Erode (Perundurai Road)', district: 'Erode', deliveryDays: '1-2 Days', express: true },

  // Vellore (632xxx)
  '632001': { city: 'Vellore (Fort Area)', district: 'Vellore', deliveryDays: '2 Days', express: true },

  // Thanjavur (613xxx)
  '613001': { city: 'Thanjavur (Old Town)', district: 'Thanjavur', deliveryDays: '2 Days', express: true },

  // Tirunelveli (627xxx)
  '627001': { city: 'Tirunelveli (Town)', district: 'Tirunelveli', deliveryDays: '2-3 Days', express: false },

  // Kanyakumari / Nagercoil (629xxx)
  '629001': { city: 'Nagercoil', district: 'Kanyakumari', deliveryDays: '2-3 Days', express: false },
};

/**
 * Validates and resolves delivery details for a given PIN code.
 * Covers full Tamil Nadu prefix check (starts with 60, 61, 62, 63, 64)
 */
export function checkPincodeServiceability(pinCode: string): PincodeInfo | null {
  const cleanPin = pinCode.trim();
  if (cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
    return null;
  }

  // Exact match
  if (TN_PINCODE_MAP[cleanPin]) {
    const data = TN_PINCODE_MAP[cleanPin];
    return {
      pinCode: cleanPin,
      city: data.city,
      district: data.district,
      state: 'Tamil Nadu',
      deliveryDays: data.deliveryDays,
      expressAvailable: data.express,
      codAvailable: true,
    };
  }

  // Prefix heuristic for Tamil Nadu (600xxx to 643xxx)
  const prefix2 = cleanPin.substring(0, 2);
  const prefix3 = cleanPin.substring(0, 3);

  if (['60', '61', '62', '63', '64'].includes(prefix2)) {
    let region = 'Tamil Nadu';
    let district = 'Tamil Nadu District';
    let deliveryDays = '2-3 Days';

    if (prefix3.startsWith('600') || prefix3.startsWith('601') || prefix3.startsWith('602')) {
      region = 'Greater Chennai & Surrounds';
      district = 'Chennai';
      deliveryDays = '24-48 Hours';
    } else if (prefix3.startsWith('641')) {
      region = 'Coimbatore / Tiruppur Hub';
      district = 'Coimbatore';
      deliveryDays = '24-48 Hours';
    } else if (prefix3.startsWith('625')) {
      region = 'Madurai Region';
      district = 'Madurai';
      deliveryDays = '2 Days';
    } else if (prefix3.startsWith('620')) {
      region = 'Trichy Central Hub';
      district = 'Tiruchirappalli';
      deliveryDays = '2 Days';
    } else if (prefix3.startsWith('636')) {
      region = 'Salem Zone';
      district = 'Salem';
      deliveryDays = '2 Days';
    }

    return {
      pinCode: cleanPin,
      city: region,
      district: district,
      state: 'Tamil Nadu',
      deliveryDays: deliveryDays,
      expressAvailable: true,
      codAvailable: true,
    };
  }

  // Nationwide delivery for all valid Indian 6-digit PIN codes
  return {
    pinCode: cleanPin,
    city: 'All-India Standard Zone',
    district: 'National Delivery',
    state: 'Tamil Nadu',
    deliveryDays: '3-4 Days (Standard Express)',
    expressAvailable: false,
    codAvailable: true,
  };
}
