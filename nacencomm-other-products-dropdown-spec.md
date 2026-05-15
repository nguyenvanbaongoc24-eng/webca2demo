# 💰 Flow Chọn Gói & Bảng Giá – Nút "MUA NGAY"
## Nacencomm CA2 | Pricing Selection Flow (Updated)

---

## 🗺️ Sơ đồ Tab Sản Phẩm

```
┌──────────────────────────────────────────────────────────────────────┐
│  [🔑 CKS]  [🧾 Hoá Đơn]  [🛡️ Bảo Hiểm]  [🏗️ CA2 Platform]  [☰ Sản phẩm khác ▾] │
│   (active)                                                  (dropdown)  │
└──────────────────────────────────────────────────────────────────────┘
```

- 4 tab chính: **CKS / Hoá Đơn / Bảo Hiểm / CA2 Platform**
- 1 tab dropdown: **"☰ Sản phẩm khác ▾"** → chứa toàn bộ sản phẩm phụ còn lại
- Mobile: Tab bar scroll ngang, dropdown chuyển thành full menu

---

## 📦 Tab Dropdown: "Sản phẩm khác"

Khi click → hiện dropdown menu liệt kê các sản phẩm phụ, chia theo nhóm:

```
┌─────────────────────────────────────────────────┐
│  ☰ Sản phẩm khác                           ▾   │
└────────────┬────────────────────────────────────┘
             │ (dropdown mở ra)
             ▼
┌─────────────────────────────────────────────────┐
│  👥 Nhân sự & Vận hành                          │
│  ├── ⏰ Chấm công – Tính lương                  │
│  └── 📊 Phần mềm Kế toán                       │
│                                                 │
│  🔒 An ninh mạng                               │
│  ├── 🔍 Rà soát lỗ hổng – Pentest Security     │
│  └── 🏛️ Tư vấn & Xây dựng hạ tầng An ninh      │
│                                                 │
│  🏛️ Chính phủ điện tử                          │
│  ├── 📋 Cung cấp tài khoản Đấu thầu            │
│  └── 🪪 eKYC – Xác thực điện tử               │
│                                                 │
│  🚀 Chuyển đổi số & Giáo dục                   │
│  ├── 🔄 Dịch vụ Chuyển đổi số                  │
│  ├── 🎓 STEM Học tập                           │
│  └── 📦 CA2 CO-VAN (Khai báo CO)               │
└─────────────────────────────────────────────────┘
```

---

## ⚙️ Data: Sản phẩm phụ (OTHER_PRODUCTS)

```javascript
const OTHER_PRODUCTS = [
  // ─── NHÓM: Nhân sự & Vận hành ───
  {
    group: "Nhân sự & Vận hành",
    groupIcon: "👥",
    items: [
      {
        slug: "cham-cong-tinh-luong",
        name: "Chấm công – Tính lương",
        icon: "⏰",
        tagline: "Tự động hóa chấm công, tính lương, quản lý nhân sự",
        flowType: "standard_form",
        extraFields: ["so_nhan_vien", "thiet_bi_cham_cong"],
        packages: [
          { label: "≤ 20 NV",          priceStr: "Liên hệ", popular: false },
          { label: "≤ 100 NV",         priceStr: "Liên hệ", popular: true  },
          { label: "Không giới hạn",   priceStr: "Liên hệ", popular: false }
        ]
      },
      {
        slug: "phan-mem-ke-toan",
        name: "Phần mềm Kế toán",
        icon: "📊",
        tagline: "Quản lý tài chính, kê khai thuế, báo cáo tự động",
        flowType: "standard_form",
        extraFields: ["so_nguoi_dung", "phan_mem_cu"],
        packages: [
          { label: "Gói Cơ bản",       priceStr: "Liên hệ", popular: false },
          { label: "Gói Tiêu chuẩn",   priceStr: "Liên hệ", popular: true  },
          { label: "Gói Nâng cao",     priceStr: "Liên hệ", popular: false }
        ]
      }
    ]
  },

  // ─── NHÓM: An ninh mạng ───
  {
    group: "An ninh mạng",
    groupIcon: "🔒",
    items: [
      {
        slug: "security-pentest",
        name: "Rà soát lỗ hổng – Security",
        icon: "🔍",
        tagline: "Kiểm thử bảo mật & đánh giá rủi ro hệ thống CNTT",
        flowType: "consult_schedule",
        extraFields: ["mo_ta_he_thong", "quy_mo", "ngay_khao_sat"],
        packages: [
          { label: "Gói Cơ bản",       priceStr: "Liên hệ", popular: false },
          { label: "Gói Toàn diện",    priceStr: "Liên hệ", popular: true  },
          { label: "Gói Enterprise",   priceStr: "Liên hệ", popular: false }
        ]
      },
      {
        slug: "tu-van-ha-tang-anninh",
        name: "Tư vấn & Xây dựng hạ tầng An ninh",
        icon: "🏛️",
        tagline: "Thiết kế & triển khai hạ tầng PKI, HSM, xác thực điện tử",
        flowType: "consult",
        packages: [
          { label: "Tư vấn miễn phí",  priceStr: "Miễn phí", popular: false },
          { label: "Gói triển khai",   priceStr: "Liên hệ",  popular: true  }
        ]
      }
    ]
  },

  // ─── NHÓM: Chính phủ điện tử ───
  {
    group: "Chính phủ điện tử",
    groupIcon: "🏛️",
    items: [
      {
        slug: "dau-thau-online",
        name: "Cung cấp tài khoản Đấu thầu",
        icon: "📋",
        tagline: "Đăng ký tài khoản đấu thầu điện tử muasamcong.mpi.gov.vn",
        flowType: "standard_upload",
        uploadDocs: ["GPKD / QĐ thành lập", "CCCD NDDPL", "Giấy ủy quyền (nếu có)"],
        packages: [
          { label: "Cấp mới",    priceStr: "Liên hệ", popular: false },
          { label: "Gia hạn",   priceStr: "Liên hệ", popular: false }
        ]
      },
      {
        slug: "ekyc",
        name: "eKYC – Xác thực điện tử",
        icon: "🪪",
        tagline: "Xác thực danh tính tích hợp VNeID & sinh trắc học",
        flowType: "consult",
        packages: [
          { label: "Demo API miễn phí", priceStr: "Miễn phí", popular: false },
          { label: "Gói sản xuất",      priceStr: "Liên hệ",  popular: true  }
        ]
      }
    ]
  },

  // ─── NHÓM: Chuyển đổi số & Giáo dục ───
  {
    group: "Chuyển đổi số & Giáo dục",
    groupIcon: "🚀",
    items: [
      {
        slug: "chuyen-doi-so",
        name: "Dịch vụ Chuyển đổi số",
        icon: "🔄",
        tagline: "Đồng hành toàn diện trên hành trình chuyển đổi số DN",
        flowType: "consult_survey",
        extraFields: ["linh_vuc", "quy_mo_dn", "van_de_hien_tai"],
        packages: [
          { label: "Khảo sát miễn phí", priceStr: "Miễn phí", popular: false },
          { label: "Gói triển khai",    priceStr: "Liên hệ",  popular: true  }
        ]
      },
      {
        slug: "stem-hoc-tap",
        name: "STEM Học tập",
        icon: "🎓",
        tagline: "Đào tạo STEM, lập trình & kỹ năng số cho học sinh, sinh viên",
        flowType: "course_register",
        extraFields: ["truong_to_chuc", "so_hoc_vien", "khoa_hoc"],
        packages: [
          { label: "Gói Cá nhân",   priceStr: "Liên hệ", popular: false },
          { label: "Gói Trường học", priceStr: "Liên hệ", popular: true  },
          { label: "Gói Trung tâm", priceStr: "Liên hệ", popular: false }
        ]
      },
      {
        slug: "ca2-co-van",
        name: "CA2 CO-VAN – Khai báo CO",
        icon: "📦",
        tagline: "Số hóa quy trình kê khai Giấy chứng nhận xuất xứ điện tử",
        flowType: "standard_upload",
        uploadDocs: ["GPKD", "Hợp đồng thương mại mẫu", "Tờ khai hải quan mẫu"],
        packages: [
          { label: "Gói DN nhỏ",    priceStr: "Liên hệ", popular: false },
          { label: "Gói Tiêu chuẩn",priceStr: "Liên hệ", popular: true  },
          { label: "Gói Lớn",       priceStr: "Liên hệ", popular: false }
        ]
      }
    ]
  }
];
```

---

## 🖼️ UI Component: Tab Bar + Dropdown

### HTML structure

```html
<div class="product-tabs">

  <!-- 4 Tab chính -->
  <button class="tab-btn active" data-tab="cks">
    🔑 Chữ ký số
  </button>
  <button class="tab-btn" data-tab="hoa-don">
    🧾 Hoá Đơn
  </button>
  <button class="tab-btn" data-tab="bao-hiem">
    🛡️ Bảo Hiểm
  </button>
  <button class="tab-btn" data-tab="ca2-platform">
    🏗️ CA2 Platform
  </button>

  <!-- Tab dropdown "Sản phẩm khác" -->
  <div class="tab-dropdown-wrap" id="otherProductsWrap">
    <button class="tab-btn tab-dropdown-trigger" id="otherProductsBtn"
      onclick="toggleOtherDropdown()">
      ☰ Sản phẩm khác <span class="chevron">▾</span>
    </button>

    <!-- Dropdown panel -->
    <div class="tab-dropdown-panel" id="otherDropdown" style="display:none">
      <!-- Render từ OTHER_PRODUCTS array -->
    </div>
  </div>

</div>
```

### CSS

```css
/* ── Tab bar ── */
.product-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f0f2f7;
  border-radius: 10px;
  padding: 6px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: #4a4f5e;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.tab-btn:hover  { background: rgba(0,48,135,0.07); color: #003087; }
.tab-btn.active { background: #003087; color: white; font-weight: 600; }

/* ── Dropdown wrapper ── */
.tab-dropdown-wrap {
  position: relative;
  margin-left: auto;        /* đẩy sang phải cùng */
}

/* Trigger button style */
.tab-dropdown-trigger {
  background: white;
  border: 1.5px solid #d0d5e0 !important;
  color: #4a4f5e;
}
.tab-dropdown-trigger:hover,
.tab-dropdown-trigger.open {
  border-color: #003087 !important;
  color: #003087;
}
.tab-dropdown-trigger .chevron {
  display: inline-block;
  transition: transform 0.2s;
  margin-left: 4px;
}
.tab-dropdown-trigger.open .chevron { transform: rotate(180deg); }

/* ── Dropdown panel ── */
.tab-dropdown-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: white;
  border: 1.5px solid #d0d5e0;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,48,135,0.14);
  z-index: 200;
  padding: 8px 0;
  animation: dropFadeIn 0.18s ease;
}
@keyframes dropFadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Nhóm trong dropdown ── */
.dropdown-group-label {
  padding: 10px 16px 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8891a4;
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 0;
  text-decoration: none;
}
.dropdown-item:hover { background: #e8eef8; }
.dropdown-item.active { background: #e8eef8; }
.dropdown-item-icon {
  font-size: 18px;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
}
.dropdown-item-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a1c23;
}
.dropdown-item-tagline {
  font-size: 12px;
  color: #8891a4;
  margin-top: 1px;
}
.dropdown-divider {
  height: 1px;
  background: #f0f2f7;
  margin: 4px 0;
}

/* ── Mobile: scroll ngang ── */
@media (max-width: 600px) {
  .product-tabs { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 2px; }
  .tab-dropdown-wrap { margin-left: 0; }
  .tab-dropdown-panel { right: auto; left: 0; width: 290px; }
}
```

### JavaScript

```javascript
function toggleOtherDropdown() {
  const panel  = document.getElementById('otherDropdown');
  const btn    = document.getElementById('otherProductsBtn');
  const isOpen = panel.style.display === 'block';
  panel.style.display = isOpen ? 'none' : 'block';
  btn.classList.toggle('open', !isOpen);
}

// Đóng dropdown khi click ngoài
document.addEventListener('click', (e) => {
  const wrap = document.getElementById('otherProductsWrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('otherDropdown').style.display = 'none';
    document.getElementById('otherProductsBtn').classList.remove('open');
  }
});

// Render OTHER_PRODUCTS vào dropdown
function renderOtherDropdown() {
  const panel = document.getElementById('otherDropdown');
  let html = '';
  OTHER_PRODUCTS.forEach((group, gi) => {
    if (gi > 0) html += '<div class="dropdown-divider"></div>';
    html += `<div class="dropdown-group-label">${group.groupIcon} ${group.group}</div>`;
    group.items.forEach(item => {
      html += `
        <div class="dropdown-item" onclick="selectOtherProduct('${item.slug}')">
          <span class="dropdown-item-icon">${item.icon}</span>
          <div>
            <div class="dropdown-item-name">${item.name}</div>
            <div class="dropdown-item-tagline">${item.tagline}</div>
          </div>
        </div>`;
    });
  });
  panel.innerHTML = html;
}

function selectOtherProduct(slug) {
  // Đóng dropdown
  document.getElementById('otherDropdown').style.display = 'none';
  document.getElementById('otherProductsBtn').classList.remove('open');
  // Đánh active tab dropdown trigger
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('otherProductsBtn').classList.add('active');
  // Load pricing panel cho sản phẩm đó
  loadProductPricing(slug);
}

// Gọi khi DOM ready
document.addEventListener('DOMContentLoaded', renderOtherDropdown);
```

---

## 🖼️ Khi chọn sản phẩm từ dropdown → Hiển thị panel giá

Sau khi người dùng click 1 item trong dropdown, **main content area** render:

```
┌────────────────────────────────────────────────────────┐
│  ← Sản phẩm khác  |  ⏰ Chấm công – Tính lương        │
│  "Tự động hóa chấm công, tính lương, quản lý nhân sự" │
├────────────────────────────────────────────────────────┤
│  Chọn quy mô doanh nghiệp:                            │
│                                                        │
│  ┌───────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │  ≤ 20 NV │  │   ≤ 100 NV   │  │ Không giới hạn│  │
│  │           │  │  ⭐ Phổ biến  │  │               │  │
│  │  Liên hệ  │  │   Liên hệ    │  │   Liên hệ     │  │
│  │[Đăng ký]  │  │  [Đăng ký]   │  │  [Đăng ký]    │  │
│  └───────────┘  └───────────────┘  └───────────────┘  │
│                                                        │
│  * Giá báo sau khi nhận được thông tin từ khách hàng  │
└────────────────────────────────────────────────────────┘
```

Hàm `loadProductPricing(slug)` tìm trong `OTHER_PRODUCTS`, extract `packages` và render card giá như các sản phẩm chính — dùng lại component `PackageCard` đã có.

---

## 📋 Mapping slug → form route

```javascript
// Dùng chung với PRICING_DATA đã có
function onSelectPackage(slug, packageLabel) {
  sessionStorage.setItem('selected_product', slug);
  sessionStorage.setItem('selected_package', packageLabel);

  // Map slug → route
  window.location.hash = `/register/${slug}`;
}
```

---

## ✅ Thứ tự build bổ sung

```
1. Thêm OTHER_PRODUCTS array vào products-data.js
2. Thêm HTML tab-dropdown-wrap vào tab bar hiện có
3. Copy CSS dropdown vào style.css
4. Gọi renderOtherDropdown() khi DOM ready
5. Implement selectOtherProduct() → loadProductPricing()
6. loadProductPricing() tái sử dụng PackageCard component
7. Test click ngoài đóng dropdown (document click listener)
8. Test mobile: dropdown mở đúng chiều, không bị clip
```
