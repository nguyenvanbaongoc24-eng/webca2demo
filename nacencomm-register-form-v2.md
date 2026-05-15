# 📋 Form Đăng Ký – Cập Nhật Layout Mới
## Nacencomm CA2 | Bỏ bước Gói cước + Học từ MISA Store

---

## 🔍 Phân tích MISA Store (tham khảo)

| Điểm hay của MISA | Áp dụng cho Nacencomm |
|---|---|
| Layout 1 trang dọc, không multi-step | ✅ Bỏ wizard, dùng accordion sections |
| Sidebar sticky bên phải: tóm tắt đơn + thanh toán | ✅ Áp dụng sidebar sticky |
| "Sản phẩm thường mua cùng" (upsell) | ✅ Thêm upsell nhẹ |
| Mã giới thiệu / mã KM | ✅ Giữ trường mã KD mặc định |
| Phương thức TT ngay trong sidebar | ✅ Chọn PT TT trong sidebar |
| Nút "Tải xuống báo giá" | ✅ Thêm nút này |
| Tách "Thông tin người mua" vs "Thông tin xuất HĐ" | ✅ Tách thành 2 section riêng |

---

## ❌ Thay đổi chính: Bỏ Step 1 "Gói cước"

### Trước (4 bước):
```
[Bước 1: Gói cước] → [Bước 2: Thông tin] → [Bước 3: Thanh toán] → [Bước 4: Ký HĐ VNeID]
```

### Sau (layout mới – 1 trang + sidebar):
```
Gói đã chọn từ trang bảng giá → Hiển thị dưới dạng "Giỏ hàng" trên đầu form
Form = 3 section accordion dọc + Sidebar sticky bên phải
```

---

## 🖼️ Layout Tổng Thể

```
┌─────────────────────────────┬──────────────────────────┐
│   MAIN CONTENT (65%)        │   SIDEBAR STICKY (35%)   │
│                             │                          │
│  ① Giỏ hàng                │  📦 Gói đã chọn          │
│  ─ Gói + giá đã chọn        │  ─ Tên SP + thời hạn     │
│  ─ Upsell sản phẩm liên quan│  ─ Số lượng: 1           │
│                             │                          │
│  ② Thông tin người mua hàng │  🏷️ Mã giới thiệu/KM     │
│  ─ Họ tên, SĐT, Chức danh  │  [Nhập mã...]  [Áp dụng] │
│  ─ Email nhận kích hoạt     │                          │
│                             │  💳 Phương thức TT       │
│  ③ Thông tin xuất hoá đơn  │  ◉ Chuyển khoản          │
│  ─ Đối tượng: DN/HKD/CN    │  ○ Thẻ ATM nội địa       │
│  ─ MST, Tên đơn vị          │  ○ Thẻ quốc tế           │
│  ─ Địa chỉ đầy đủ           │  ○ Ví điện tử            │
│  ─ Email nhận HĐ            │                          │
│                             │  💰 Tổng thanh toán      │
│  ④ Upload hồ sơ (nếu có)   │  Gói 2 Năm    2.189.000đ │
│  ─ GPKD, CCCD, HĐ ký...    │  ──────────────────────  │
│                             │  Tổng  **2.189.000 đ**   │
│                             │                          │
│                             │  ☑ Đồng ý điều khoản    │
│                             │  [🛒 Gửi đăng ký]        │
│                             │                          │
│                             │  [📥 Tải xuống báo giá]  │
└─────────────────────────────┴──────────────────────────┘
```

---

## 📦 Section ①: Giỏ hàng (Cart Summary)

> Tự động điền từ `sessionStorage` — KH không cần chọn lại gói

```html
<div class="cart-section">
  <div class="section-header">
    <span class="section-num">1</span>
    <h3>Giỏ hàng</h3>
    <button class="btn-change-pkg" onclick="history.back()">← Đổi gói</button>
  </div>

  <!-- Cart table -->
  <table class="cart-table">
    <thead>
      <tr>
        <th>Gói sản phẩm / Dịch vụ</th>
        <th>Đơn vị tính</th>
        <th>Số lượng</th>
        <th>Đơn giá (VND)</th>
        <th>Thành tiền (VND)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="cart-product-icon">🔑</div>
          <div>
            <div class="cart-product-name" id="cart_name">Chữ ký số USB Token</div>
            <div class="cart-product-sub" id="cart_pkg">Gói 2 Năm</div>
          </div>
        </td>
        <td>Gói</td>
        <td>1</td>
        <td id="cart_price">2.189.000</td>
        <td id="cart_total">2.189.000</td>
      </tr>
    </tbody>
  </table>

  <!-- Upsell: Sản phẩm thường mua cùng -->
  <div class="upsell-section">
    <div class="upsell-title">Sản phẩm thường được mua cùng</div>
    <div class="upsell-grid">
      <!-- Render tùy theo sản phẩm chính đang mua -->
    </div>
  </div>
</div>
```

### Upsell mapping theo sản phẩm chính:

```javascript
const UPSELL_MAP = {
  'chu-ky-so-token': [
    { icon: '🧾', name: 'Hoá đơn điện tử', priceFrom: 'Liên hệ' },
    { icon: '📊', name: 'Phần mềm kế toán', priceFrom: 'Liên hệ' },
    { icon: '📱', name: 'Remote Signing', priceFrom: 'Liên hệ' }
  ],
  'remote-signing': [
    { icon: '🔑', name: 'Chữ ký số USB Token', priceFrom: '1.638.000đ' },
    { icon: '🧾', name: 'Hoá đơn điện tử', priceFrom: 'Liên hệ' },
    { icon: '🪪', name: 'eKYC – Xác thực điện tử', priceFrom: 'Liên hệ' }
  ],
  'hoa-don-dien-tu': [
    { icon: '📊', name: 'Phần mềm kế toán', priceFrom: 'Liên hệ' },
    { icon: '🔑', name: 'Chữ ký số USB Token', priceFrom: '1.638.000đ' },
    { icon: '⏰', name: 'Chấm công – Tính lương', priceFrom: 'Liên hệ' }
  ]
  // ... các sản phẩm khác
};
```

---

## 👤 Section ②: Thông tin người mua hàng

```html
<div class="form-section accordion open" id="sec_buyer">
  <div class="section-header" onclick="toggleSection('sec_buyer')">
    <span class="section-num">2</span>
    <h3>Thông tin người mua hàng</h3>
    <span class="chevron">▲</span>
  </div>
  <div class="section-body">
    <div class="form-grid-3">
      <div class="field">
        <label>Họ và tên <span class="req">*</span></label>
        <input type="text" id="hoTen" placeholder="Nhập họ và tên" oninput="clearErr(this)">
        <div class="field-error" id="err_hoTen">Vui lòng nhập họ và tên</div>
      </div>
      <div class="field">
        <label>Số điện thoại <span class="req">*</span></label>
        <input type="tel" id="sdt" placeholder="Nhập số điện thoại" oninput="clearErr(this)">
        <div class="field-error" id="err_sdt">Vui lòng nhập SĐT hợp lệ</div>
      </div>
      <div class="field">
        <label>Chức danh <span class="req">*</span></label>
        <select id="chucDanh">
          <option value="">Chọn chức danh</option>
          <option>Giám đốc</option>
          <option>Phó Giám đốc</option>
          <option>Kế toán trưởng</option>
          <option>Kế toán</option>
          <option>Nhân viên</option>
          <option>Chủ hộ kinh doanh</option>
          <option>Cá nhân</option>
        </select>
        <div class="field-error" id="err_chucDanh">Vui lòng chọn chức danh</div>
      </div>
    </div>
    <div class="field mt16">
      <label>Email nhận mã kích hoạt và giấy phép sử dụng <span class="req">*</span></label>
      <input type="email" id="emailKichHoat" placeholder="Nhập địa chỉ email" oninput="clearErr(this)">
      <div class="field-error" id="err_emailKichHoat">Email không hợp lệ</div>
    </div>
  </div>
</div>
```

---

## 🏢 Section ③: Thông tin xuất hoá đơn

```html
<div class="form-section accordion open" id="sec_invoice">
  <div class="section-header" onclick="toggleSection('sec_invoice')">
    <span class="section-num">3</span>
    <h3>Thông tin xuất hoá đơn</h3>
    <span class="chevron">▲</span>
  </div>
  <div class="section-body">

    <!-- Đối tượng nhận hoá đơn -->
    <div class="field">
      <label>Đối tượng nhận hoá đơn <span class="req">*</span></label>
      <div class="radio-inline-group">
        <label class="radio-inline">
          <input type="radio" name="doiTuongHD" value="dn" checked onchange="onDoiTuongHD(this)">
          Doanh nghiệp
        </label>
        <label class="radio-inline">
          <input type="radio" name="doiTuongHD" value="hkd" onchange="onDoiTuongHD(this)">
          Hộ kinh doanh
        </label>
        <label class="radio-inline">
          <input type="radio" name="doiTuongHD" value="cn" onchange="onDoiTuongHD(this)">
          Cá nhân
        </label>
      </div>
    </div>

    <!-- Fields theo đối tượng -->
    <div class="form-grid-2 mt16" id="fields_dn_hkd">
      <div class="field">
        <label>Mã số thuế <span class="req">*</span></label>
        <input type="text" id="maSoThue" placeholder="Nhập mã số thuế" oninput="clearErr(this)">
        <div class="field-error" id="err_maSoThue">Vui lòng nhập MST</div>
      </div>
      <div class="field">
        <label>Tên đơn vị <span class="req">*</span></label>
        <input type="text" id="tenDonVi" placeholder="Nhập tên đơn vị" oninput="clearErr(this)">
        <div class="field-error" id="err_tenDonVi">Vui lòng nhập tên đơn vị</div>
      </div>
    </div>

    <div class="form-grid-3 mt16">
      <div class="field">
        <label>Quốc gia <span class="req">*</span></label>
        <select id="quocGia">
          <option value="vn" selected>Việt Nam</option>
        </select>
      </div>
      <div class="field">
        <label>Tỉnh / Thành phố <span class="req">*</span></label>
        <select id="tinhTp" onchange="clearErr(this)">
          <option value="">Chọn tỉnh/thành phố</option>
          <!-- 63 tỉnh thành -->
        </select>
        <div class="field-error" id="err_tinhTp">Vui lòng chọn tỉnh/TP</div>
      </div>
      <div class="field">
        <label>Phường / Xã <span class="req">*</span></label>
        <select id="phuongXa" onchange="clearErr(this)">
          <option value="">Chọn phường/xã</option>
        </select>
        <div class="field-error" id="err_phuongXa">Vui lòng chọn phường/xã</div>
      </div>
    </div>

    <div class="field mt16">
      <label>Địa chỉ đầy đủ <span class="req">*</span></label>
      <input type="text" id="diaChi" placeholder="Số nhà, tên đường..." oninput="clearErr(this)">
      <div class="field-error" id="err_diaChi">Vui lòng nhập địa chỉ</div>
    </div>

    <div class="field mt16">
      <label>Email nhận hoá đơn <span class="req">*</span></label>
      <input type="email" id="emailHD" placeholder="Nhập địa chỉ email" oninput="clearErr(this)">
      <div class="field-error" id="err_emailHD">Email không hợp lệ</div>
    </div>

  </div>
</div>
```

---

## 📎 Section ④: Upload hồ sơ (chỉ hiện với sản phẩm cần hồ sơ)

```html
<!-- Chỉ render nếu product.requireUpload === true -->
<div class="form-section accordion open" id="sec_upload">
  <div class="section-header" onclick="toggleSection('sec_upload')">
    <span class="section-num">4</span>
    <h3>Upload hồ sơ điện tử</h3>
    <span class="chevron">▲</span>
  </div>
  <div class="section-body">
    <div class="notice-box">
      📌 Upload ảnh chụp / scan. File PDF hoặc JPG/PNG, tối đa 10MB mỗi file.
    </div>
    <div class="upload-grid">
      <!-- Render 4 ô upload từ product.uploadDocs[] -->
    </div>
  </div>
</div>
```

---

## 📌 Sidebar Sticky (bên phải)

```html
<aside class="order-sidebar">

  <!-- Tóm tắt đơn hàng -->
  <div class="sidebar-card">
    <div class="sidebar-title">📦 Thông tin tài nguyên</div>
    <div class="sidebar-product" id="sb_productName">Chữ ký số USB Token</div>
    <div class="sidebar-row">
      <span>CTS</span><span>1</span>
    </div>
    <div class="sidebar-row">
      <span>Thời hạn sử dụng</span>
      <span id="sb_duration">2 năm</span>
    </div>
  </div>

  <!-- Mã giới thiệu / Mã KM -->
  <div class="sidebar-card">
    <div class="sidebar-title">🏷️ Mã giới thiệu / Khuyến mại</div>
    <div class="promo-row">
      <input type="text" id="maKM" placeholder="Nhập mã...">
      <button onclick="applyPromo()">Áp dụng</button>
    </div>
    <!-- Mã KD mặc định ẩn — backend tự gắn -->
    <input type="hidden" id="maKD" value="NCM-DEFAULT">
  </div>

  <!-- Phương thức thanh toán -->
  <div class="sidebar-card">
    <div class="sidebar-title">💳 Phương thức thanh toán</div>
    <div class="payment-options">
      <label class="payment-opt selected" id="pt_ck">
        <input type="radio" name="ptTT" value="chuyen_khoan" checked
          onchange="onSelectPT(this)">
        🏦 Chuyển khoản ngân hàng
      </label>
      <label class="payment-opt" id="pt_atm">
        <input type="radio" name="ptTT" value="the_atm" onchange="onSelectPT(this)">
        💳 Thẻ ATM nội địa
      </label>
      <label class="payment-opt" id="pt_intl">
        <input type="radio" name="ptTT" value="the_qt" onchange="onSelectPT(this)">
        🌐 Thẻ quốc tế (Visa/Master)
      </label>
      <label class="payment-opt" id="pt_ewallet">
        <input type="radio" name="ptTT" value="vi_dt" onchange="onSelectPT(this)">
        📱 Ví điện tử (MoMo/ZaloPay)
      </label>
    </div>
    <div class="payment-note">Hỗ trợ bởi cổng thanh toán <strong>JetPay</strong></div>
  </div>

  <!-- Tổng thanh toán -->
  <div class="sidebar-card sidebar-total">
    <div class="total-row">
      <span id="sb_pkgLabel">Gói 2 Năm</span>
      <span id="sb_priceVal">2.189.000</span>
    </div>
    <div class="total-final">
      <span>Tổng thanh toán</span>
      <span id="sb_totalVal" class="total-amount">2.189.000 đ</span>
    </div>
    <div class="total-note">Đã bao gồm VAT 10%</div>
  </div>

  <!-- Điều khoản + CTA -->
  <div class="sidebar-card">
    <label class="agree-row">
      <input type="checkbox" id="chkAgree">
      Tôi đồng ý với
      <a href="https://nacencomm.vn" target="_blank">Thỏa thuận mua hàng</a>
      và <a href="https://nacencomm.vn" target="_blank">Chính sách bảo vệ dữ liệu</a>
    </label>
    <div class="field-error" id="err_agree" style="margin:4px 0 8px">
      Vui lòng đồng ý điều khoản
    </div>

    <button class="btn-submit" id="btnSubmit" onclick="submitForm()">
      🛒 Gửi đăng ký
    </button>

    <button class="btn-download-quote" onclick="downloadQuote()">
      📥 Tải xuống báo giá
    </button>
  </div>

</aside>
```

---

## 💅 CSS Sidebar & Layout

```css
/* ── Two-column layout ── */
.register-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 20px 60px;
  align-items: start;
}

/* Sidebar sticky */
.order-sidebar {
  position: sticky;
  top: 80px;                /* below header */
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-card {
  background: white;
  border: 1px solid #d0d5e0;
  border-radius: 10px;
  padding: 16px;
}
.sidebar-title {
  font-size: 13px;
  font-weight: 700;
  color: #003087;
  margin-bottom: 12px;
}
.sidebar-product {
  font-size: 15px;
  font-weight: 600;
  color: #1a1c23;
  margin-bottom: 8px;
}
.sidebar-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #4a4f5e;
  padding: 4px 0;
  border-bottom: 1px solid #f0f2f7;
}
.sidebar-row:last-child { border-bottom: none; }

/* Promo input */
.promo-row { display: flex; gap: 8px; }
.promo-row input {
  flex: 1;
  border: 1.5px solid #d0d5e0;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 13px;
}
.promo-row button {
  background: #003087;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

/* Payment options */
.payment-opt {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1.5px solid #d0d5e0;
  border-radius: 8px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}
.payment-opt:hover   { border-color: #003087; color: #003087; }
.payment-opt.selected{ border-color: #003087; background: #e8eef8; color: #003087; }
.payment-note {
  font-size: 11px;
  color: #8891a4;
  margin-top: 8px;
  text-align: center;
}

/* Total */
.sidebar-total { background: #f8faff; }
.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #4a4f5e;
  margin-bottom: 8px;
}
.total-final {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  color: #1a1c23;
  padding-top: 10px;
  border-top: 1.5px solid #d0d5e0;
}
.total-amount { color: #d62b2b; font-size: 20px; }
.total-note { font-size: 11px; color: #8891a4; margin-top: 4px; text-align: right; }

/* CTA buttons */
.btn-submit {
  width: 100%;
  background: #003087;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background 0.2s;
}
.btn-submit:hover { background: #001f5c; }

.btn-download-quote {
  width: 100%;
  background: transparent;
  color: #003087;
  border: 1.5px solid #003087;
  border-radius: 8px;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-download-quote:hover { background: #e8eef8; }

/* ── Accordion sections ── */
.form-section {
  background: white;
  border: 1px solid #d0d5e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  background: white;
}
.section-header:hover { background: #f8faff; }
.section-num {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: #003087;
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  flex-shrink: 0;
}
.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1c23;
  flex: 1;
}
.section-header .chevron { color: #8891a4; }
.section-body { padding: 0 20px 20px; }
.form-section:not(.open) .section-body { display: none; }

/* Cart table */
.cart-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.cart-table th {
  background: #e8eef8;
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  color: #003087;
  font-size: 12px;
}
.cart-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f0f2f7;
  vertical-align: middle;
}
.cart-product-name { font-weight: 600; color: #003087; }
.cart-product-sub  { font-size: 12px; color: #8891a4; }

/* Upsell */
.upsell-section { padding: 16px 0 4px; }
.upsell-title   { font-size: 13px; font-weight: 600; color: #4a4f5e; margin-bottom: 10px; }
.upsell-grid    { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; }
.upsell-card {
  flex-shrink: 0;
  border: 1.5px solid #d0d5e0;
  border-radius: 8px;
  padding: 10px 14px;
  min-width: 150px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.upsell-card:hover { border-color: #003087; background: #e8eef8; }
.upsell-add-btn {
  margin-left: auto;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #003087;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}

/* Grid helpers */
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.mt16 { margin-top: 16px; }

/* Responsive */
@media (max-width: 768px) {
  .register-layout { grid-template-columns: 1fr; }
  .order-sidebar   { position: static; }
  .form-grid-2, .form-grid-3 { grid-template-columns: 1fr; }
}
```

---

## ⚙️ JavaScript: Load dữ liệu từ sessionStorage

```javascript
// Chạy khi trang load
function initRegisterPage() {
  const product  = sessionStorage.getItem('selected_product')  || 'chu-ky-so-token';
  const pkgLabel = sessionStorage.getItem('selected_package')  || 'Gói 2 Năm';
  const price    = sessionStorage.getItem('selected_price')    || '2.189.000';
  const doiTuong = sessionStorage.getItem('selected_doituong') || 'Doanh Nghiệp';

  // Điền vào cart section
  const productData = PRICING_DATA[product];
  document.getElementById('cart_name').textContent    = productData?.name    || product;
  document.getElementById('cart_pkg').textContent     = pkgLabel;
  document.getElementById('cart_price').textContent   = price;
  document.getElementById('cart_total').textContent   = price;

  // Điền vào sidebar
  document.getElementById('sb_productName').textContent = productData?.name || product;
  document.getElementById('sb_duration').textContent    = pkgLabel;
  document.getElementById('sb_pkgLabel').textContent    = pkgLabel;
  document.getElementById('sb_priceVal').textContent    = price;
  document.getElementById('sb_totalVal').textContent    = price + ' đ';

  // Render upsell
  renderUpsell(product);

  // Render upload section nếu cần
  if (productData?.requireUpload) {
    renderUploadSection(productData.uploadDocs);
  } else {
    document.getElementById('sec_upload')?.remove();
  }
}

// Accordion toggle
function toggleSection(id) {
  document.getElementById(id).classList.toggle('open');
}

// Phương thức thanh toán
function onSelectPT(radio) {
  document.querySelectorAll('.payment-opt').forEach(o => o.classList.remove('selected'));
  radio.parentElement.classList.add('selected');
}

// Đối tượng hoá đơn
function onDoiTuongHD(radio) {
  const showBusiness = ['dn', 'hkd'].includes(radio.value);
  document.getElementById('fields_dn_hkd').style.display = showBusiness ? 'grid' : 'none';
}

// Validate & Submit
function submitForm() {
  if (!document.getElementById('chkAgree').checked) {
    document.getElementById('err_agree').classList.add('show');
    return;
  }
  const fields = ['hoTen','sdt','chucDanh','emailKichHoat','tenDonVi','maSoThue','tinhTp','diaChi','emailHD'];
  let ok = true;
  fields.forEach(id => { if (!v(id)) ok = false; });
  if (!ok) return;

  // Mock submit → hiện modal xử lý thanh toán
  showPaymentModal();
}

// Tải báo giá mock
function downloadQuote() {
  const product  = sessionStorage.getItem('selected_product')  || '';
  const pkgLabel = sessionStorage.getItem('selected_package')  || '';
  alert(`Demo: Tải xuống báo giá\n${product} – ${pkgLabel}`);
  // Thực tế: dùng jsPDF sinh file PDF
}

document.addEventListener('DOMContentLoaded', initRegisterPage);
```

---

## ✅ Tóm tắt thay đổi so với phiên bản cũ

| Hạng mục | Cũ | Mới |
|---|---|---|
| Step 1 Gói cước | ✅ Có (trong form) | ❌ Bỏ — chọn ở trang bảng giá |
| Layout | Multi-step wizard | 1 trang dọc + sidebar sticky |
| Thông tin mua hàng | 1 section chung | Tách: người mua / xuất HĐ |
| Phương thức TT | Bước riêng | Trong sidebar (chọn trực tiếp) |
| Tổng tiền | Không hiện | Sidebar hiện real-time |
| Upsell | Không có | Có (sản phẩm thường mua cùng) |
| Mã KM | Trường đơn giản | Input + nút "Áp dụng" |
| Tải báo giá | Không có | Nút "📥 Tải xuống báo giá" |
| Đồng ý điều khoản | Cuối form | Trong sidebar trước nút submit |

---

## 📌 Ghi chú cho Antigravity

1. Xoá toàn bộ Step 1 "Gói cước" khỏi form wizard hiện tại
2. Đổi layout form sang grid 2 cột (main + sidebar) theo CSS trên
3. `initRegisterPage()` đọc `sessionStorage` — đảm bảo trang bảng giá đã `sessionStorage.setItem()` đúng keys: `selected_product`, `selected_package`, `selected_price`, `selected_doituong`
4. Modal thanh toán giữ nguyên như spec cũ (processing 1.5s → success)
5. Responsive: dưới 768px sidebar xuống dưới main content
