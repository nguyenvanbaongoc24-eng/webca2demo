# 🔧 Fix Spec – webca2demo-next.vercel.app
## Danh sách lỗi & Code sửa đầy đủ

---

## ❌ LỖI 1 – Giá sai toàn bộ (Nghiêm trọng nhất)

### Hiện trạng:
- 5 gói: 1 năm (2.400.000), 2 năm (3.500.000), 3 năm (4.400.000), 4 năm (5.200.000), 5 năm (5.900.000)

### Sai ở đâu:
- **CKS Token chỉ có 3 gói**: 1 năm, 2 năm, 3 năm
- Giá thật (Doanh nghiệp): 1.638.000 / 2.189.000 / 3.100.000 đ (đã VAT 10%)
- Giá thật (HKD/Cá nhân): 979.000 / 1.638.000 / 2.189.000 đ (đã VAT 10%)
- **Không tồn tại** gói 4 năm, 5 năm

### Fix:
```javascript
// pricing-data.js - CKS USB TOKEN
const CKS_TOKEN_PRICING = {
  'dn': [  // Doanh nghiệp / Tổ chức
    {
      label: '1 Năm',
      duration: '12 tháng',
      price: 1638000,
      priceStr: '1.638.000',
      popular: false,
      includes: ['01 CKS USB Token', 'USB Token vật lý', 'Hỗ trợ kỹ thuật']
    },
    {
      label: '2 Năm',
      duration: '24 tháng',
      price: 2189000,
      priceStr: '2.189.000',
      popular: true,  // Badge "Gói khuyên dùng"
      includes: ['01 CKS USB Token', 'USB Token vật lý', 'Hỗ trợ kỹ thuật', 'Tiết kiệm 15%']
    },
    {
      label: '3 Năm',
      duration: '36 tháng',
      price: 3100000,
      priceStr: '3.100.000',
      popular: false,
      includes: ['01 CKS USB Token', 'USB Token vật lý', 'Hỗ trợ kỹ thuật', 'Tiết kiệm 23%']
    }
  ],
  'hkd_cn': [  // HKD / Cá nhân
    {
      label: '1 Năm',
      duration: '12 tháng',
      price: 979000,
      priceStr: '979.000',
      popular: false,
      includes: ['01 CKS USB Token', 'USB Token vật lý']
    },
    {
      label: '2 Năm',
      duration: '24 tháng',
      price: 1638000,
      priceStr: '1.638.000',
      popular: true,
      includes: ['01 CKS USB Token', 'USB Token vật lý', 'Tiết kiệm 16%']
    },
    {
      label: '3 Năm',
      duration: '36 tháng',
      price: 2189000,
      priceStr: '2.189.000',
      popular: false,
      includes: ['01 CKS USB Token', 'USB Token vật lý', 'Tiết kiệm 25%']
    }
  ]
};
```

---

## ❌ LỖI 2 – Combo sản phẩm không tồn tại

### Hiện trạng:
Mỗi gói ghi: `"01 CKS Remote Signing + 01 CKS USB Token"`

### Sai ở đâu:
- **CKS Token** và **Remote Signing** là 2 sản phẩm hoàn toàn riêng biệt
- Không có combo "Token + RS" đóng gói sẵn
- Mỗi sản phẩm có bảng giá riêng

### Fix:
```javascript
// Khi render pricing card cho CKS USB Token
includes: [
  '01 CKS USB Token',        // ← CHỈ Token
  'USB Token vật lý',
  'Hỗ trợ kỹ thuật'
]
// KHÔNG ghi "01 CKS Remote Signing"

// Khi render pricing card cho Remote Signing
includes: [
  '01 CKS Remote Signing',   // ← CHỈ RS
  'Ký số từ xa qua app',
  'Không cần USB Token'
]
// KHÔNG ghi "01 CKS USB Token"
```

---

## ❌ LỖI 3 – Remote Signing thiếu sub-tabs "Theo năm" / "Theo lượt ký"

### Hiện trạng:
Remote Signing chỉ hiển thị 1 bảng giá giống hệt CKS Token

### Sai ở đâu:
Remote Signing có 2 loại gói:
- **Theo năm**: 1 năm / 2 năm / 3 năm
- **Theo lượt ký**: 50 lượt / 100 lượt / 500 lượt

### Fix:
```javascript
// pricing-data.js - REMOTE SIGNING
const RS_PRICING = {
  'theo_nam': {
    'dn': [  // Doanh nghiệp
      { label: '1 Năm',  priceStr: 'Liên hệ', includes: ['01 CKS Remote Signing', 'Không giới hạn lượt ký'] },
      { label: '2 Năm',  priceStr: 'Liên hệ', popular: true, includes: ['01 CKS Remote Signing', 'Không giới hạn', 'Tiết kiệm 15%'] },
      { label: '3 Năm',  priceStr: 'Liên hệ', includes: ['01 CKS Remote Signing', 'Không giới hạn', 'Tiết kiệm 25%'] }
    ],
    'hkd_cn': [  // HKD / Cá nhân
      { label: '1 Năm',  priceStr: 'Liên hệ', includes: ['01 CKS Remote Signing', 'Ký VNeID online'] },
      { label: '2 Năm',  priceStr: 'Liên hệ', popular: true, includes: ['01 CKS Remote Signing', 'Ký VNeID', 'Tiết kiệm'] },
      { label: '3 Năm',  priceStr: 'Liên hệ', includes: ['01 CKS Remote Signing', 'Ký VNeID', 'Ưu đãi'] }
    ]
  },
  'theo_luot': {
    'dn': [
      { label: '50 lượt',   priceStr: 'Liên hệ', includes: ['50 chữ ký', 'Không thời hạn'] },
      { label: '100 lượt',  priceStr: 'Liên hệ', popular: true, includes: ['100 chữ ký', 'Không thời hạn'] },
      { label: '500 lượt',  priceStr: 'Liên hệ', includes: ['500 chữ ký', 'Không thời hạn'] }
    ],
    'hkd_cn': [
      { label: '20 lượt',   priceStr: 'Liên hệ', includes: ['20 chữ ký', 'Không thời hạn'] },
      { label: '50 lượt',   priceStr: 'Liên hệ', popular: true, includes: ['50 chữ ký', 'Không thời hạn'] }
    ]
  }
};
```

### UI thêm sub-tabs cho RS:
```html
<!-- Chỉ hiện khi tab "Remote Signing" active -->
<div class="pricing-subtabs" id="rs_subtabs" style="display:none">
  <button class="subtab-btn active" onclick="switchRSSubtab('theo_nam')">
    Theo năm
  </button>
  <button class="subtab-btn" onclick="switchRSSubtab('theo_luot')">
    Theo lượt ký
  </button>
</div>

<style>
.pricing-subtabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
}
.subtab-btn {
  padding: 8px 20px;
  border-radius: 20px;
  border: 1.5px solid #d0d5e0;
  background: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.subtab-btn:hover { border-color: #003087; color: #003087; }
.subtab-btn.active { background: #003087; color: white; border-color: #003087; }
</style>
```

---

## ❌ LỖI 4 – Tabs không hoạt động

### Hiện trạng:
Nhấn tab khác (Remote Signing, Hóa đơn điện tử, CA2 Platform) → không render lại bảng giá

### Fix:
```javascript
// Tab switching logic
function switchPricingTab(tabName) {
  // 1. Update tab active state
  document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab_' + tabName).classList.add('active');

  // 2. Hide/show RS subtabs
  const showRSSubtab = (tabName === 'remote-signing');
  document.getElementById('rs_subtabs').style.display = showRSSubtab ? 'flex' : 'none';

  // 3. Render pricing cards
  const doiTuong = getCurrentDoiTuong();  // 'dn' or 'hkd_cn'
  renderPricingCards(tabName, doiTuong);
}

function renderPricingCards(product, doiTuong) {
  let packages = [];
  
  switch(product) {
    case 'cks-token':
      packages = CKS_TOKEN_PRICING[doiTuong];
      break;
    case 'remote-signing':
      const rsSubtab = getCurrentRSSubtab();  // 'theo_nam' or 'theo_luot'
      packages = RS_PRICING[rsSubtab][doiTuong];
      break;
    case 'hoa-don':
      packages = HOADON_PRICING[doiTuong];
      break;
    case 'ca2-platform':
      // Không có bảng giá → hiển thị form tư vấn
      renderConsultForm();
      return;
  }

  // Clear và render lại cards
  const container = document.getElementById('pricing-cards-container');
  container.innerHTML = '';
  packages.forEach(pkg => {
    container.innerHTML += renderPackageCard(pkg, product, doiTuong);
  });
}
```

---

## ❌ LỖI 5 – Thiếu dropdown "Sản phẩm khác"

### Hiện trạng:
Chỉ có 4 tabs: CKS Token, Remote Signing, Hóa đơn điện tử, CA2 Platform

### Cần thêm:
Tab dropdown thứ 5: **"☰ Sản phẩm khác ▾"** chứa 10 sản phẩm phụ

### Fix:
```html
<!-- Thêm tab dropdown sau 4 tab chính -->
<div class="pricing-tabs">
  <button class="pricing-tab active" id="tab_cks-token"
    onclick="switchPricingTab('cks-token')">
    🔑 CKS USB Token
  </button>
  <button class="pricing-tab" id="tab_remote-signing"
    onclick="switchPricingTab('remote-signing')">
    📱 Remote Signing
  </button>
  <button class="pricing-tab" id="tab_hoa-don"
    onclick="switchPricingTab('hoa-don')">
    🧾 Hóa đơn điện tử
  </button>
  <button class="pricing-tab" id="tab_ca2-platform"
    onclick="switchPricingTab('ca2-platform')">
    🏗️ CA2 Platform
  </button>

  <!-- Dropdown tab -->
  <div class="pricing-tab-dropdown-wrap">
    <button class="pricing-tab dropdown-trigger" onclick="toggleOtherDropdown()">
      ☰ Sản phẩm khác <span class="chevron">▾</span>
    </button>
    <div class="dropdown-panel" id="otherDropdownPanel" style="display:none">
      <!-- Render 10 sản phẩm phụ theo spec đã có -->
    </div>
  </div>
</div>
```

---

## ❌ LỖI 6 – Badge "Phổ biến" đặt sai chỗ

### Hiện trạng:
Badge "PHỔ BIẾN" ở toggle "Doanh nghiệp / Tổ chức"

### Sai ở đâu:
- Remote Signing cho **Doanh nghiệp** → Flow B (KD liên hệ), KHÔNG đăng ký online
- Remote Signing cho **HKD/Cá nhân** → Flow A (VNeID online) ← mới là flow chính

### Fix:
```javascript
// Badge logic
function getBadgeForToggle(product, doiTuong) {
  // Chỉ RS + HKD/CN mới có badge "Phổ biến"
  if (product === 'remote-signing' && doiTuong === 'hkd_cn') {
    return { text: 'PHỔ BIẾN', color: '#f5a623' };
  }
  // CKS Token + DN có badge "Phổ biến"
  if (product === 'cks-token' && doiTuong === 'dn') {
    return { text: 'PHỔ BIẾN', color: '#f5a623' };
  }
  return null;
}

// Render toggle
<label class="toggle-option ${badge ? 'has-badge' : ''}">
  <input type="radio" name="doituong" value="dn">
  Doanh nghiệp / Tổ chức
  ${badge?.text ? `<span class="badge">${badge.text}</span>` : ''}
</label>
```

---

## ❌ LỖI 7 – Hình ảnh không load

### Hiện trạng:
Hero section phía phải có vùng trống, không hiển thị hình

### Fix:
```javascript
// Hero image fallback
<div class="hero-image-container">
  <img
    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
    alt="Digital Security Platform"
    loading="lazy"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.innerHTML = '<div class="image-placeholder">🔐</div>';
    }}
  />
</div>

<style>
.hero-image-container {
  position: relative;
  width: 100%;
  max-width: 600px;
}
.image-placeholder {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.05);
  border-radius: 16px;
  font-size: 80px;
}
</style>
```

---

## 📊 Data đầy đủ cho 4 tab chính

```javascript
// ===== PRICING DATA =====
const PRICING_DATA = {

  // 1. CKS USB Token
  'cks-token': {
    name: 'Chữ ký số USB Token',
    icon: '🔑',
    hasSubtabs: false,
    pricing: {
      'dn': [
        { label: '1 Năm', price: 1638000, priceStr: '1.638.000', popular: false },
        { label: '2 Năm', price: 2189000, priceStr: '2.189.000', popular: true },
        { label: '3 Năm', price: 3100000, priceStr: '3.100.000', popular: false }
      ],
      'hkd_cn': [
        { label: '1 Năm', price: 979000,  priceStr: '979.000',   popular: false },
        { label: '2 Năm', price: 1638000, priceStr: '1.638.000', popular: true },
        { label: '3 Năm', price: 2189000, priceStr: '2.189.000', popular: false }
      ]
    }
  },

  // 2. Remote Signing
  'remote-signing': {
    name: 'Remote Signing',
    icon: '📱',
    hasSubtabs: true,
    subtabs: ['Theo năm', 'Theo lượt ký'],
    pricing: {
      'theo_nam': {
        'dn': [
          { label: '1 Năm', priceStr: 'Liên hệ', popular: false },
          { label: '2 Năm', priceStr: 'Liên hệ', popular: true },
          { label: '3 Năm', priceStr: 'Liên hệ', popular: false }
        ],
        'hkd_cn': [
          { label: '1 Năm', priceStr: 'Liên hệ', popular: false },
          { label: '2 Năm', priceStr: 'Liên hệ', popular: true },
          { label: '3 Năm', priceStr: 'Liên hệ', popular: false }
        ]
      },
      'theo_luot': {
        'dn': [
          { label: '50 lượt',  priceStr: 'Liên hệ', popular: false },
          { label: '100 lượt', priceStr: 'Liên hệ', popular: true },
          { label: '500 lượt', priceStr: 'Liên hệ', popular: false }
        ],
        'hkd_cn': [
          { label: '20 lượt', priceStr: 'Liên hệ', popular: false },
          { label: '50 lượt', priceStr: 'Liên hệ', popular: true }
        ]
      }
    }
  },

  // 3. Hóa đơn điện tử
  'hoa-don': {
    name: 'Hóa đơn điện tử',
    icon: '🧾',
    hasSubtabs: false,
    pricing: {
      'dn': [
        { label: '300 HĐ/năm',        priceStr: 'Liên hệ', popular: false, note: 'Khởi nghiệp' },
        { label: '1.000 HĐ/năm',      priceStr: 'Liên hệ', popular: true,  note: 'Phổ biến' },
        { label: '3.000 HĐ/năm',      priceStr: 'Liên hệ', popular: false },
        { label: 'Không giới hạn',    priceStr: 'Liên hệ', popular: false, note: 'Enterprise' }
      ],
      'hkd_cn': null  // Không áp dụng cho HKD/CN
    }
  },

  // 4. CA2 Platform
  'ca2-platform': {
    name: 'CA2 Sign Platform',
    icon: '🏗️',
    type: 'consult',  // Không có bảng giá
    description: 'Giải pháp ký số tập trung quy mô lớn. Giá tính theo số user và quy mô triển khai.',
    cta: 'Đăng ký nhận tư vấn'
  }

};
```

---

## ✅ Checklist áp dụng fix

```
□ 1. Cập nhật PRICING_DATA với giá đúng (xóa gói 4,5 năm)
□ 2. Xóa text "01 CKS Remote Signing + 01 CKS USB Token"
□ 3. Thêm sub-tabs cho Remote Signing
□ 4. Implement switchPricingTab() hoạt động đúng
□ 5. Thêm tab dropdown "Sản phẩm khác" (10 SP phụ)
□ 6. Di chuyển badge "Phổ biến" sang HKD/CN cho RS
□ 7. Fix hero image với fallback placeholder
□ 8. Test: Click tab → render đúng bảng giá
□ 9. Test: RS subtab "Theo năm" / "Theo lượt" hoạt động
□ 10. Test: Toggle DN/HKD render giá khác nhau
```

---

## 📌 Ưu tiên fix

| # | Lỗi | Độ nghiêm trọng | Ưu tiên |
|---|---|---|---|
| 1 | Giá sai + gói 4,5 năm | 🔴 Cao | 1 |
| 2 | Combo SP không tồn tại | 🔴 Cao | 2 |
| 4 | Tabs không hoạt động | 🟠 Trung bình | 3 |
| 3 | RS thiếu sub-tabs | 🟠 Trung bình | 4 |
| 6 | Badge đặt sai | 🟡 Thấp | 5 |
| 5 | Thiếu dropdown | 🟡 Thấp | 6 |
| 7 | Hình không load | 🟡 Thấp | 7 |

Fix theo thứ tự này để đảm bảo nghiệp vụ đúng trước, UI polish sau.
