# 💰 Flow Chọn Gói & Bảng Giá – Nút "MUA NGAY"
## Nacencomm CA2 | Pricing Selection Flow

> **Nguồn**: Phân tích từ sơ đồ tay + tham khảo bảng giá nacencomm.vn  
> **Mục tiêu**: Khi KH nhấn "MUA NGAY" → hiển thị bảng giá đúng sản phẩm → KH tự chọn gói → vào form đăng ký

---

## 🗺️ Sơ đồ flow tổng thể (từ ảnh viết tay)

```
[MUA NGAY]
    │
    ▼
Hiển thị Trang Chọn Sản Phẩm (Bảng Giá CKS – RS)
    │
    ├──────────────┬──────────────────┬─────────────────┐
    ▼              ▼                  ▼                  ▼
  [CKS]       [Hoá Đơn]     [Phần mềm Bảo Hiểm]  [CA2 Platform]
    │           → Bảng Giá       → Bảng Giá          → Bảng Giá
    │
    ├──────────────┐
    ▼              ▼
[CKS RS]      [CKS Token]
(Remote        (USB Token)
Signing)
    │              │
    ▼              ▼
Chọn loại:    Chọn loại:
- Theo năm    - Theo năm (1/2/3 năm)
- Theo lượt   
    │              │
    ▼              ▼
Chọn đối tượng:
┌─────────────────┬────────────────────┐
│ Doanh Nghiệp    │ HKD / Cá Nhân      │
│ (có giá)        │ (có giá)           │
└─────────────────┴────────────────────┘
    │
    ▼
[Chọn gói → Vào Form Đăng Ký]
```

---

## 📦 NHÓM 1: Chữ Ký Số (CKS)

Khi click **CKS** → hiện 2 lựa chọn con:

```
┌──────────────────────┬──────────────────────┐
│   🔑 CKS Token       │   📱 CKS Remote      │
│   (USB Token)        │   Signing (RS)        │
│   Ký bằng USB truyền │   Ký từ xa qua App    │
│   thống              │   không cần Token     │
│                      │                       │
│   [Xem bảng giá]     │   [Xem bảng giá]      │
└──────────────────────┴──────────────────────┘
```

---

### 1A. CKS Token – Bảng Giá

#### Bước chọn: Đối tượng khách hàng

```
◉ Doanh Nghiệp / Tổ Chức
○ Hộ Kinh Doanh (HKD) / Cá Nhân
```

#### Bảng giá CKS Token – Doanh Nghiệp / Tổ Chức

| Gói | Thời hạn | Phí dịch vụ (chưa VAT) | Tổng tiền (đã VAT 10%) | Ghi chú |
|---|---|---|---|---|
| Gói 1 Năm | 12 tháng | 1.490.000 đ | **1.638.000 đ** | |
| Gói 2 Năm | 24 tháng | 1.990.000 đ | **2.189.000 đ** | ⭐ Tiết kiệm |
| Gói 3 Năm | 36 tháng | 2.820.000 đ | **3.100.000 đ** | 💎 Ưu đãi nhất |

> ⚠️ **Lưu ý cho Codex**: Đây là giá tham khảo từ các nguồn đại lý. Cần xác nhận giá chính thức tại [nacencomm.vn/bang-gia](https://nacencomm.vn/bang-gia) trước khi publish. Hiển thị giá dạng `"Liên hệ báo giá"` nếu chưa xác nhận được giá chính thức.

#### Bảng giá CKS Token – Hộ Kinh Doanh / Cá Nhân

| Gói | Thời hạn | Phí dịch vụ (chưa VAT) | Tổng tiền (đã VAT 10%) |
|---|---|---|---|
| Gói 1 Năm | 12 tháng | 890.000 đ | **979.000 đ** |
| Gói 2 Năm | 24 tháng | 1.490.000 đ | **1.638.000 đ** |
| Gói 3 Năm | 36 tháng | 1.990.000 đ | **2.189.000 đ** |

---

### 1B. CKS Remote Signing (RS) – Bảng Giá

#### Bước chọn: Loại gói

```
◉ Theo năm (1 năm / 2 năm / 3 năm)
○ Theo lượt ký
```

#### Bảng giá RS – Theo năm – Doanh Nghiệp / Tổ Chức

| Gói | Thời hạn | Tổng tiền (đã VAT) | Ghi chú |
|---|---|---|---|
| Gói 1 Năm | 12 tháng | **Liên hệ** | |
| Gói 2 Năm | 24 tháng | **Liên hệ** | ⭐ Phổ biến |
| Gói 3 Năm | 36 tháng | **Liên hệ** | 💎 Ưu đãi nhất |

#### Bảng giá RS – Theo lượt ký – Doanh Nghiệp

| Gói lượt ký | Số lượt | Tổng tiền (đã VAT) |
|---|---|---|
| Gói 50 lượt | 50 chữ ký | **Liên hệ** |
| Gói 100 lượt | 100 chữ ký | **Liên hệ** |
| Gói 500 lượt | 500 chữ ký | **Liên hệ** |

#### Bảng giá RS – Theo năm – Hộ Kinh Doanh / Cá Nhân

| Gói | Thời hạn | Tổng tiền (đã VAT) |
|---|---|---|
| Gói 1 Năm | 12 tháng | **Liên hệ** |
| Gói 2 Năm | 24 tháng | **Liên hệ** |
| Gói 3 Năm | 36 tháng | **Liên hệ** |

---

## 📦 NHÓM 2: Hoá Đơn Điện Tử – Bảng Giá

Khi click **Hoá Đơn** → hiện bảng giá theo số lượng hoá đơn/năm:

| Gói | Số hoá đơn/năm | Tổng tiền (đã VAT) | Ghi chú |
|---|---|---|---|
| Gói Khởi Nghiệp | 300 HĐ/năm | **Liên hệ** | Phù hợp DN nhỏ |
| Gói Tiêu Chuẩn | 1.000 HĐ/năm | **Liên hệ** | ⭐ Phổ biến |
| Gói Doanh Nghiệp | 3.000 HĐ/năm | **Liên hệ** | |
| Gói Không Giới Hạn | Không giới hạn | **Liên hệ** | 💎 Lớn nhất |

---

## 📦 NHÓM 3: Phần Mềm Bảo Hiểm – Bảng Giá

Khi click **Phần mềm Bảo Hiểm** → hiện bảng giá theo số nhân viên:

| Gói | Số nhân viên | Tổng tiền (đã VAT) |
|---|---|---|
| Gói Nhỏ | ≤ 10 NV | **Liên hệ** |
| Gói Vừa | ≤ 50 NV | **Liên hệ** |
| Gói Lớn | ≤ 200 NV | **Liên hệ** |
| Gói Enterprise | Không giới hạn | **Liên hệ** |

---

## 📦 NHÓM 4: CA2 Platform – Bảng Giá

Khi click **CA2 Platform** → hiển thị thông tin tư vấn (không có giá cố định):

```
CA2 Sign Platform là giải pháp Enterprise.
Giá được tính theo quy mô triển khai và số lượng người dùng.

→ Vui lòng để lại thông tin để nhận báo giá chi tiết.

[📋 Đăng ký nhận báo giá]
```

---

## 🖼️ UI Layout: Trang Bảng Giá

### Cấu trúc trang `/pricing` hoặc popup khi nhấn "MUA NGAY"

```
┌────────────────────────────────────────────────────────┐
│  TIÊU ĐỀ: Chọn sản phẩm phù hợp với nhu cầu của bạn  │
│  Sub: Giá đã bao gồm VAT. Hỗ trợ 24/7 – 1900 5454 07  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  TAB CHỌN SẢN PHẨM:                                   │
│  [CKS] [Hoá Đơn] [Phần mềm BH] [CA2 Platform]        │
│   ^^^                                                  │
│   (active = underline navy + text navy)                │
│                                                        │
├────────────────────────────────────────────────────────┤
│  (Khi chọn CKS → hiện sub-tab)                        │
│  Sub-tab: [🔑 USB Token] [📱 Remote Signing]           │
│                                                        │
├────────────────────────────────────────────────────────┤
│  (Khi chọn RS → hiện toggle)                          │
│  [Theo năm] [Theo lượt ký]                            │
│                                                        │
├────────────────────────────────────────────────────────┤
│  (Chọn đối tượng)                                     │
│  ◉ Doanh Nghiệp / Tổ Chức                            │
│  ○ Hộ Kinh Doanh / Cá Nhân                           │
│                                                        │
├────────────────────────────────────────────────────────┤
│  BẢNG GIÁ (render theo lựa chọn):                     │
│                                                        │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐        │
│  │  1 Năm  │  │    2 Năm     │  │  3 Năm  │        │
│  │         │  │  ⭐ Phổ biến  │  │         │        │
│  │ 1.638.000│  │  2.189.000  │  │ 3.100.000│        │
│  │ đ/năm   │  │  đ/2 năm    │  │ đ/3 năm │        │
│  │         │  │             │  │         │        │
│  │[Mua gói]│  │  [Mua gói]  │  │[Mua gói]│        │
│  └──────────┘  └──────────────┘  └──────────┘        │
│                                                        │
│  * Giá đã bao gồm VAT 10%                            │
│  * Cấp mới: Kèm USB Token (đối với CKS Token)        │
└────────────────────────────────────────────────────────┘
```

---

## ⚙️ Logic render bảng giá (JavaScript data)

```javascript
const PRICING_DATA = {

  // ===== CKS TOKEN =====
  "cks-token": {
    name: "Chữ ký số USB Token",
    icon: "🔑",
    tabs: ["Doanh Nghiệp / Tổ Chức", "HKD / Cá Nhân"],
    packages: {
      "Doanh Nghiệp / Tổ Chức": [
        {
          label: "1 Năm",
          duration: "12 tháng",
          price: 1638000,
          priceStr: "1.638.000 đ",
          popular: false,
          note: ""
        },
        {
          label: "2 Năm",
          duration: "24 tháng",
          price: 2189000,
          priceStr: "2.189.000 đ",
          popular: true,
          note: "Tiết kiệm hơn"
        },
        {
          label: "3 Năm",
          duration: "36 tháng",
          price: 3100000,
          priceStr: "3.100.000 đ",
          popular: false,
          note: "Ưu đãi nhất"
        }
      ],
      "HKD / Cá Nhân": [
        {
          label: "1 Năm",
          duration: "12 tháng",
          price: 979000,
          priceStr: "979.000 đ",
          popular: false,
          note: ""
        },
        {
          label: "2 Năm",
          duration: "24 tháng",
          price: 1638000,
          priceStr: "1.638.000 đ",
          popular: true,
          note: "Tiết kiệm hơn"
        },
        {
          label: "3 Năm",
          duration: "36 tháng",
          price: 2189000,
          priceStr: "2.189.000 đ",
          popular: false,
          note: "Ưu đãi nhất"
        }
      ]
    }
  },

  // ===== REMOTE SIGNING =====
  "remote-signing": {
    name: "Remote Signing",
    icon: "📱",
    tabs: ["Doanh Nghiệp / Tổ Chức", "HKD / Cá Nhân"],
    subtabs: ["Theo năm", "Theo lượt ký"],
    packages: {
      "theo-nam": {
        "Doanh Nghiệp / Tổ Chức": [
          { label: "1 Năm", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: false },
          { label: "2 Năm", duration: "24 tháng", price: null, priceStr: "Liên hệ", popular: true },
          { label: "3 Năm", duration: "36 tháng", price: null, priceStr: "Liên hệ", popular: false }
        ],
        "HKD / Cá Nhân": [
          { label: "1 Năm", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: false },
          { label: "2 Năm", duration: "24 tháng", price: null, priceStr: "Liên hệ", popular: true },
          { label: "3 Năm", duration: "36 tháng", price: null, priceStr: "Liên hệ", popular: false }
        ]
      },
      "theo-luot": {
        "Doanh Nghiệp / Tổ Chức": [
          { label: "50 lượt",  duration: "Không hạn",  price: null, priceStr: "Liên hệ", popular: false },
          { label: "100 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: true },
          { label: "500 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: false }
        ],
        "HKD / Cá Nhân": [
          { label: "20 lượt",  duration: "Không hạn",  price: null, priceStr: "Liên hệ", popular: false },
          { label: "50 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: true }
        ]
      }
    }
  },

  // ===== HOÁ ĐƠN =====
  "hoa-don": {
    name: "Hoá Đơn Điện Tử",
    icon: "🧾",
    tabs: ["Doanh Nghiệp"],
    packages: {
      "Doanh Nghiệp": [
        { label: "300 HĐ/năm",          price: null, priceStr: "Liên hệ", popular: false, note: "DN nhỏ" },
        { label: "1.000 HĐ/năm",        price: null, priceStr: "Liên hệ", popular: true,  note: "Phổ biến" },
        { label: "3.000 HĐ/năm",        price: null, priceStr: "Liên hệ", popular: false, note: "" },
        { label: "Không giới hạn",      price: null, priceStr: "Liên hệ", popular: false, note: "Enterprise" }
      ]
    }
  },

  // ===== BẢO HIỂM =====
  "bao-hiem": {
    name: "Phần Mềm Bảo Hiểm",
    icon: "🛡️",
    tabs: ["Theo quy mô"],
    packages: {
      "Theo quy mô": [
        { label: "≤ 10 NV",      price: null, priceStr: "Liên hệ", popular: false },
        { label: "≤ 50 NV",      price: null, priceStr: "Liên hệ", popular: true },
        { label: "≤ 200 NV",     price: null, priceStr: "Liên hệ", popular: false },
        { label: "Không giới hạn", price: null, priceStr: "Liên hệ", popular: false }
      ]
    }
  },

  // ===== CA2 PLATFORM =====
  "ca2-platform": {
    name: "CA2 Platform",
    icon: "🏗️",
    type: "consult", // Không hiện bảng giá, hiện form tư vấn
    description: "Giải pháp ký số tập trung quy mô lớn. Giá theo quy mô triển khai và số user.",
    cta: "Đăng ký nhận báo giá"
  }

};
```

---

## 🔁 Logic điều hướng sau khi chọn gói

```javascript
function onSelectPackage(product, packageLabel, doiTuong) {
  // Lưu vào sessionStorage để form đăng ký đọc lại
  sessionStorage.setItem('selected_product', product);
  sessionStorage.setItem('selected_package', packageLabel);
  sessionStorage.setItem('selected_doituong', doiTuong);

  // Điều hướng sang form đăng ký tương ứng
  const slugMap = {
    'cks-token':       '/register/chu-ky-so-token',
    'remote-signing':  '/register/remote-signing',
    'hoa-don':         '/register/hoa-don-dien-tu',
    'bao-hiem':        '/register/phan-mem-bao-hiem',
    'ca2-platform':    '/register/ca2-sign-platform'
  };

  window.location.hash = slugMap[product];
}
```

---

## 🎨 UI Component: Package Card

```html
<!-- Card giá (dùng cho tất cả sản phẩm) -->
<div class="pkg-card {popular ? 'popular' : ''}" onclick="onSelectPackage(...)">
  
  <!-- Badge phổ biến (chỉ hiện nếu popular = true) -->
  {#if popular}
  <span class="badge-popular">⭐ Phổ biến</span>
  {/if}

  <!-- Tên gói -->
  <div class="pkg-name">{label}</div>

  <!-- Thời hạn -->
  <div class="pkg-duration">{duration}</div>

  <!-- Giá -->
  <div class="pkg-price">
    {#if price != null}
      <span class="price-amount">{priceStr}</span>
      <span class="price-note">Đã bao gồm VAT 10%</span>
    {:else}
      <span class="price-contact">Liên hệ báo giá</span>
    {/if}
  </div>

  <!-- Nút chọn -->
  <button class="btn-select-pkg">
    {#if price != null} Mua ngay {:else} Đăng ký tư vấn {/if}
  </button>

  <!-- Check indicator -->
  <div class="pkg-check"></div>

</div>
```

```css
/* Package card styles */
.pkg-card {
  position: relative;
  border: 2px solid #d0d5e0;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s;
  background: white;
}
.pkg-card:hover,
.pkg-card.selected {
  border-color: #003087;
  box-shadow: 0 4px 16px rgba(0, 48, 135, 0.12);
}
.pkg-card.selected { background: #e8eef8; }
.pkg-card.popular  { border-color: #f5a623; }

.badge-popular {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #f5a623;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 14px;
  border-radius: 20px;
  white-space: nowrap;
}

.pkg-name      { font-size: 20px; font-weight: 700; color: #003087; margin-bottom: 4px; }
.pkg-duration  { font-size: 13px; color: #8891a4; margin-bottom: 16px; }
.price-amount  { font-size: 22px; font-weight: 700; color: #003087; display: block; }
.price-note    { font-size: 11px; color: #8891a4; display: block; margin-top: 2px; }
.price-contact { font-size: 16px; font-weight: 600; color: #003087; }

.btn-select-pkg {
  margin-top: 20px;
  width: 100%;
  background: #003087;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-select-pkg:hover { background: #001f5c; }
.pkg-card.popular .btn-select-pkg { background: #d62b2b; }
```

---

## 📌 Lưu ý quan trọng cho Antigravity / Codex

1. **Giá CKS Token** đã tham khảo từ nguồn đại lý — cần confirm lại tại `nacencomm.vn/bang-gia` và cập nhật vào `PRICING_DATA` trước khi demo sếp.

2. **Giá RS và các sản phẩm khác** hiện để `"Liên hệ"` — khi có bảng giá chính thức thì update `price` và `priceStr` trong object tương ứng là xong (không cần sửa UI).

3. **sessionStorage** lưu lựa chọn của KH để form đăng ký tự điền sẵn gói đã chọn ở Bước 1.

4. **Thứ tự tab mặc định**: CKS → CKS Token → Doanh Nghiệp → Theo năm.

5. **Responsive**: Mobile hiển thị 1 card/hàng, scroll ngang hoặc stack dọc.

6. **Nút "MUA NGAY" trên Product Card** ở trang chủ/danh mục → truyền thẳng `product slug` vào URL, trang giá tự active đúng tab.

---

## ✅ Thứ tự build

```
1. Tạo PRICING_DATA object (copy từ file này)
2. Build component Tab sản phẩm (CKS / Hoá Đơn / Bảo Hiểm / CA2)
3. Build sub-tab CKS (Token / RS)
4. Build toggle RS (Theo năm / Theo lượt)
5. Build radio đối tượng (DN / HKD+Cá Nhân)
6. Render PackageCard động từ PRICING_DATA
7. Connect nút "Mua ngay" / "Đăng ký tư vấn" → sessionStorage → /register/:slug
8. Trên form đăng ký: đọc sessionStorage → điền sẵn gói đã chọn ở Bước 1
```
