# 🔀 Flow Routing Spec – Đúng Nghiệp Vụ
## Nacencomm CA2 | VNeID flow vs Kinh doanh liên hệ flow

---

## 🎯 Nguyên tắc phân luồng

| Điều kiện | Flow áp dụng |
|---|---|
| **Remote Signing** + đối tượng **HKD / Cá nhân** | ✅ Flow A – Ký VNeID online |
| **Tất cả sản phẩm khác** (mọi đối tượng) | ✅ Flow B – Kinh doanh liên hệ |
| **Remote Signing** + đối tượng **Doanh nghiệp / Tổ chức** | ✅ Flow B – Kinh doanh liên hệ |

---

## 🗺️ Flow A – Ký VNeID Online
### Chỉ áp dụng: Remote Signing + HKD / Cá nhân

```
[Chọn gói RS – HKD/Cá nhân]
        │
        ▼
[Điền form thông tin + Upload hồ sơ]
        │
        ▼
[Thanh toán mock]
        │
        ▼
[Hệ thống sinh 2 file PDF: ĐKSD + Hợp đồng]
[Gửi về email KH]
        │
        ▼
[Hướng dẫn KH ký 2 file PDF bằng VNeID]
  → Tải app VNeID nếu chưa có
  → Ký số điện tử vào 2 file
  → Upload 2 file đã ký lên hệ thống
        │
        ▼
[CA2 thẩm định hồ sơ]
  → Duyệt  → Gửi mã kích hoạt RS về email
  → Từ chối → Hiện lý do, yêu cầu upload lại
        │
        ▼
[Hướng dẫn tải app RS + Nhập mã kích hoạt + Tạo PIN]
        │
        ▼
[✅ Kích hoạt thành công]
```

---

## 🗺️ Flow B – Kinh doanh liên hệ
### Áp dụng cho: Tất cả sản phẩm còn lại + RS Doanh nghiệp

```
[KH điền form thông tin + chọn gói]
        │
        ▼
[Nhấn "Gửi đăng ký"]
        │
        ▼
[Màn hình xác nhận thành công]
  "Chúng tôi đã nhận được thông tin của bạn.
   Nhân viên kinh doanh sẽ liên hệ trong vòng
   1 ngày làm việc để xác nhận và hướng dẫn
   các bước tiếp theo."
        │
        ▼ (Phía sau – không hiện trên web)
[Hồ sơ điện tử chuyển về KD phụ trách]
[Mã KD mặc định gắn trên web được ghi nhận]
        │
        ▼
[KD liên hệ KH qua SĐT / Email]
[Xác nhận thông tin + Báo giá chính thức]
        │
        ▼
[Ký hợp đồng]
  → Ký tay trực tiếp, hoặc
  → Ký số qua email/hệ thống nội bộ
        │
        ▼
[Cung cấp dịch vụ + Bàn giao]
[KD hướng dẫn KH sử dụng]
        │
        ▼
[✅ Hoàn tất]
```

---

## 🔧 Logic phân luồng trong code

```javascript
/**
 * Xác định flow sau khi KH submit form
 * @param {string} productSlug - slug sản phẩm
 * @param {string} doiTuong    - 'dn' | 'hkd' | 'cn'
 * @returns {string} 'flow_vneid' | 'flow_sales'
 */
function determineFlow(productSlug, doiTuong) {
  const isRS     = productSlug === 'remote-signing';
  const isHKDorCN = ['hkd', 'cn'].includes(doiTuong);

  if (isRS && isHKDorCN) return 'flow_vneid';
  return 'flow_sales';
}

// Gọi khi submit form
function submitForm() {
  // ... validate ...

  const product  = sessionStorage.getItem('selected_product');
  const doiTuong = sessionStorage.getItem('selected_doituong');
  const flow     = determineFlow(product, doiTuong);

  if (flow === 'flow_vneid') {
    goToVNeIDFlow();
  } else {
    goToSalesFlow();
  }
}
```

---

## 📄 Màn hình kết thúc Flow B – "Đã nhận đăng ký"

> Đây là màn hình KH thấy ngay sau khi submit form (Flow B)

```html
<div class="success-screen">

  <!-- Icon -->
  <div class="success-icon">✅</div>

  <!-- Tiêu đề -->
  <h2>Đăng ký thành công!</h2>

  <!-- Mã hồ sơ mock -->
  <div class="ticket-badge">
    Mã hồ sơ: <strong id="ticketCode">NCM-2025-XXXXX</strong>
  </div>

  <!-- Thông tin đã đăng ký -->
  <div class="success-summary">
    <div class="summary-row">
      <span>Sản phẩm</span>
      <span id="sc_product">Chữ ký số USB Token</span>
    </div>
    <div class="summary-row">
      <span>Gói</span>
      <span id="sc_pkg">Gói 2 Năm</span>
    </div>
    <div class="summary-row">
      <span>Email liên hệ</span>
      <span id="sc_email">—</span>
    </div>
    <div class="summary-row">
      <span>Số điện thoại</span>
      <span id="sc_sdt">—</span>
    </div>
  </div>

  <!-- Thông báo bước tiếp theo -->
  <div class="next-steps-box">
    <div class="next-steps-title">📌 Các bước tiếp theo</div>
    <ol class="next-steps-list">
      <li>
        <strong>Nhân viên kinh doanh sẽ liên hệ bạn</strong> qua SĐT/Email
        trong vòng <strong>1 ngày làm việc</strong> để xác nhận thông tin.
      </li>
      <li>
        Sau khi xác nhận, bạn sẽ nhận được <strong>báo giá chính thức</strong>
        và hướng dẫn thanh toán.
      </li>
      <li>
        Ký hợp đồng và <strong>nhận bàn giao dịch vụ</strong>
        trong vòng 1–2 ngày làm việc kế tiếp.
      </li>
    </ol>
  </div>

  <!-- Hotline hỗ trợ -->
  <div class="support-note">
    Cần hỗ trợ ngay? Gọi <a href="tel:19005454 07"><strong>1900 5454 07</strong></a>
    hoặc email <a href="mailto:sale@nacencomm.vn">sale@nacencomm.vn</a>
  </div>

  <!-- Nút -->
  <div class="success-actions">
    <a href="#/" class="btn btn-primary">🏠 Về trang chủ</a>
    <a href="#/products" class="btn btn-secondary">📦 Xem sản phẩm khác</a>
  </div>

</div>
```

---

## 📄 Màn hình Flow A – Sau submit: Hướng dẫn ký VNeID

> Chỉ hiện với Remote Signing + HKD/Cá nhân

```html
<div class="vneid-guide-screen">

  <div class="success-icon">📄</div>
  <h2>Hồ sơ đã được tiếp nhận!</h2>
  <p>Hệ thống đã tạo 2 file PDF và gửi về email của bạn:</p>
  <div class="email-badge" id="vn_email">—</div>

  <!-- 2 file PDF -->
  <div class="pdf-download-group">
    <a class="pdf-btn" href="#" onclick="mockDownload('DKSD')">
      📄 Đăng_Ký_Sử_Dụng.pdf
      <span class="pdf-sub">Tải về & ký số</span>
    </a>
    <a class="pdf-btn" href="#" onclick="mockDownload('HDSD')">
      📄 Hop_Dong_Dich_Vu.pdf
      <span class="pdf-sub">Tải về & ký số</span>
    </a>
  </div>

  <!-- Hướng dẫn ký VNeID -->
  <div class="guide-steps">
    <div class="guide-title">📱 Hướng dẫn ký bằng VNeID</div>
    <ol>
      <li>Tải app <strong>VNeID</strong> từ App Store / Google Play (nếu chưa có)</li>
      <li>Mở app → Chọn <strong>"Ký số"</strong> → Chọn file PDF vừa tải</li>
      <li>Xác thực sinh trắc học (khuôn mặt / vân tay)</li>
      <li>Ký vào <strong>cả 2 file</strong> (ĐKSD + Hợp đồng)</li>
      <li>Quay lại đây để <strong>upload 2 file đã ký</strong></li>
    </ol>
  </div>

  <!-- Nút store -->
  <div class="app-store-btns">
    <a href="https://apps.apple.com/vn/app/vneid/id1579919570" target="_blank"
      class="store-btn">
      🍎 App Store
    </a>
    <a href="https://play.google.com/store/apps/details?id=com.vnpt.vneid" target="_blank"
      class="store-btn">
      🤖 Google Play
    </a>
  </div>

  <!-- Upload 2 file đã ký -->
  <div class="upload-signed-section">
    <div class="upload-signed-title">📤 Upload file đã ký VNeID</div>
    <div class="upload-grid-2">
      <div class="upload-zone" id="uz_dksd">
        <span>☁️</span>
        <p>ĐKSD đã ký VNeID</p>
        <button onclick="triggerUpload('uz_dksd')">Chọn file</button>
        <input type="file" accept=".pdf" style="display:none"
          onchange="onFileSelected(this,'uz_dksd')">
      </div>
      <div class="upload-zone" id="uz_hdsd">
        <span>☁️</span>
        <p>Hợp đồng đã ký VNeID</p>
        <button onclick="triggerUpload('uz_hdsd')">Chọn file</button>
        <input type="file" accept=".pdf" style="display:none"
          onchange="onFileSelected(this,'uz_hdsd')">
      </div>
    </div>

    <button class="btn-submit-signed" id="btnSubmitSigned"
      disabled onclick="submitSignedDocs()">
      ✅ Gửi hồ sơ đã ký → CA2 thẩm định
    </button>
    <p class="upload-hint">Vui lòng upload đủ 2 file để tiếp tục</p>
  </div>

</div>
```

---

## 📄 Màn hình Thẩm định (Flow A)

```html
<!-- Hiện sau khi submit 2 file đã ký -->
<div class="review-status-screen">

  <div class="status-icon pending">⏳</div>
  <h2>Đang thẩm định hồ sơ</h2>
  <p>CA2 đang xem xét hồ sơ của bạn. Kết quả sẽ gửi về email:</p>
  <div class="email-badge" id="rev_email">—</div>
  <p class="time-note">Thời gian xử lý: <strong>1 – 2 ngày làm việc</strong></p>

  <!-- Nút demo (chỉ dùng khi demo) -->
  <div class="demo-controls">
    <p class="demo-label">⚙️ Demo controls:</p>
    <button class="btn-demo-approve" onclick="mockApprove()">
      ✅ Mô phỏng: Duyệt hồ sơ
    </button>
    <button class="btn-demo-reject" onclick="mockReject()">
      ❌ Mô phỏng: Từ chối hồ sơ
    </button>
  </div>

</div>

<!-- Nhánh DUYỆT -->
<div id="screen_approved" style="display:none">
  <div class="status-icon success">✅</div>
  <h2>Hồ sơ đã được duyệt!</h2>
  <div class="activation-code-box">
    <p>Mã kích hoạt Remote Signing của bạn:</p>
    <div class="code-display" id="activationCode">RS-XXXX-XXXX</div>
    <p class="code-note">Mã đã gửi về email. Dùng để kích hoạt app.</p>
  </div>
  <button class="btn btn-primary" onclick="goToActivation()">
    📱 Tiếp tục kích hoạt App →
  </button>
</div>

<!-- Nhánh TỪ CHỐI -->
<div id="screen_rejected" style="display:none">
  <div class="status-icon danger">❌</div>
  <h2>Hồ sơ chưa đạt yêu cầu</h2>
  <div class="reject-reason-box">
    <p><strong>Lý do:</strong></p>
    <div class="reject-reason" id="rejectReason">—</div>
  </div>
  <button class="btn btn-primary" onclick="goBackToUpload()">
    🔄 Upload lại hồ sơ
  </button>
</div>
```

---

## 📄 Màn hình Kích hoạt App (Flow A – bước cuối)

```html
<div class="activation-screen">
  <h2>📱 Kích hoạt Remote Signing</h2>

  <!-- Sub-step 1: Tải app -->
  <div class="act-step" id="act1">
    <div class="act-step-num">1</div>
    <div class="act-step-content">
      <div class="act-step-title">Tải ứng dụng CA2 Remote Signing</div>
      <div class="app-store-btns">
        <a href="#" class="store-btn">🍎 App Store</a>
        <a href="#" class="store-btn">🤖 Google Play</a>
      </div>
      <label class="confirm-check">
        <input type="checkbox" id="chk_downloaded" onchange="onAppDownloaded()">
        Tôi đã tải ứng dụng thành công
      </label>
    </div>
  </div>

  <!-- Sub-step 2: Nhập mã kích hoạt -->
  <div class="act-step disabled" id="act2">
    <div class="act-step-num">2</div>
    <div class="act-step-content">
      <div class="act-step-title">Nhập mã kích hoạt</div>
      <p class="act-step-sub">Mã đã gửi về email của bạn</p>
      <div class="code-input-row">
        <span class="code-prefix">RS –</span>
        <input type="text" id="codeInput" maxlength="9"
          placeholder="XXXX-XXXX" oninput="formatCodeInput(this)">
      </div>
      <div class="field-error" id="err_code">Mã kích hoạt không đúng</div>
      <button class="btn btn-primary" onclick="verifyCode()">Xác nhận mã</button>
    </div>
  </div>

  <!-- Sub-step 3: Tạo PIN -->
  <div class="act-step disabled" id="act3">
    <div class="act-step-num">3</div>
    <div class="act-step-content">
      <div class="act-step-title">Tạo mã PIN bảo mật</div>
      <p class="act-step-sub">⚠️ Không chia sẻ PIN với bất kỳ ai</p>
      <div class="field">
        <label>PIN (6 chữ số)</label>
        <input type="password" id="pin1" maxlength="6" placeholder="••••••"
          oninput="onPinInput()">
      </div>
      <div class="field mt12">
        <label>Nhập lại PIN</label>
        <input type="password" id="pin2" maxlength="6" placeholder="••••••"
          oninput="onPinInput()">
      </div>
      <div class="field-error" id="err_pin">PIN không khớp hoặc chưa đủ 6 số</div>
      <button class="btn btn-primary" id="btnFinish"
        disabled onclick="finishActivation()">
        🎉 Hoàn tất kích hoạt
      </button>
    </div>
  </div>

</div>
```

---

## 🎉 Màn hình Hoàn tất (Flow A)

```html
<div class="final-screen">
  <div class="final-icon">🎉</div>
  <h2>Dịch vụ đã được kích hoạt!</h2>

  <div class="final-summary">
    <div class="summary-row"><span>Họ tên</span>     <span id="fs_name">—</span></div>
    <div class="summary-row"><span>Sản phẩm</span>   <span>Remote Signing</span></div>
    <div class="summary-row"><span>Đối tượng</span>  <span id="fs_type">Cá nhân</span></div>
    <div class="summary-row"><span>Gói</span>        <span id="fs_pkg">—</span></div>
    <div class="summary-row"><span>Hiệu lực đến</span><span id="fs_expire">—</span></div>
  </div>

  <div class="final-note">
    Bạn có thể bắt đầu ký số ngay trên ứng dụng
    <strong>CA2 Remote Signing</strong>.
  </div>

  <div class="final-actions">
    <a href="#/" class="btn btn-primary">🏠 Về trang chủ</a>
    <a href="#/support" class="btn btn-secondary">📖 Hướng dẫn sử dụng</a>
  </div>
</div>
```

---

## 📊 Bảng tóm tắt flow theo sản phẩm

| Sản phẩm | Doanh nghiệp | HKD | Cá nhân |
|---|---|---|---|
| Remote Signing | Flow B | **Flow A (VNeID)** | **Flow A (VNeID)** |
| CKS USB Token | Flow B | Flow B | Flow B |
| CA2 Sign Platform | Flow B | — | — |
| Hoá đơn điện tử | Flow B | Flow B | — |
| Phần mềm kế toán | Flow B | — | — |
| Phần mềm bảo hiểm | Flow B | — | — |
| Chấm công – Lương | Flow B | — | — |
| Security Pentest | Flow B | — | — |
| Tư vấn hạ tầng | Flow B | — | — |
| Đấu thầu online | Flow B | Flow B | — |
| Chuyển đổi số | Flow B | — | — |
| STEM Học tập | Flow B | — | Flow B |
| CA2 CO-VAN | Flow B | — | — |
| eKYC | Flow B | — | — |

---

## ✅ Checklist implement

```
Flow B (áp dụng cho hầu hết):
  □ Submit form → hiện màn hình "Đã nhận đăng ký"
  □ Sinh mã hồ sơ mock: NCM- + năm + 5 số random
  □ Hiện 3 bước tiếp theo rõ ràng (KD liên hệ → Báo giá → Bàn giao)
  □ Hiện hotline + email hỗ trợ
  □ Nút "Về trang chủ" + "Xem sản phẩm khác"
  □ KHÔNG hiện upload hồ sơ, KHÔNG hiện ký VNeID

Flow A (chỉ RS + HKD/CN):
  □ determineFlow() trả về 'flow_vneid' đúng điều kiện
  □ Sinh 2 PDF mock (jsPDF) + "gửi email" mock
  □ Hướng dẫn ký VNeID + link App Store/Play
  □ Upload 2 file đã ký → enable nút gửi khi đủ 2 file
  □ Mock thẩm định: 2 nút demo (Duyệt / Từ chối)
  □ Nhánh Duyệt → sinh mã kích hoạt random RS-XXXX-XXXX
  □ Nhánh Từ chối → hiện lý do mock → nút "Upload lại"
  □ Màn hình kích hoạt: 3 sub-step tuần tự (tải app → mã → PIN)
  □ Validate mã kích hoạt khớp với mã mock đã sinh
  □ Validate PIN: 6 số, 2 lần nhập khớp
  □ Màn hình hoàn tất với thông tin hợp đồng
```

---

## 📌 Ghi chú quan trọng cho Antigravity

1. **`determineFlow()`** phải chạy TRƯỚC khi navigate sau submit — đặt trong hàm `submitForm()`
2. Màn hình Flow B **KHÔNG có** bước upload, ký VNeID, thẩm định, kích hoạt — kết thúc ngay ở "Đã nhận đăng ký"
3. Màn hình Flow B **CÓ** mã hồ sơ để KH theo dõi và đối chiếu với KD khi được gọi
4. Đối tượng `doiTuong` lấy từ `sessionStorage` ('dn' / 'hkd' / 'cn') — phải set khi KH chọn ở trang bảng giá
5. Nếu `sessionStorage` không có `doiTuong` → mặc định là **Flow B** (an toàn hơn)
