# Nacencomm.vn - Website Demo Spec

## Mục tiêu

Demo website nacencomm.vn được tái thiết kế để thêm nút **Mua ngay** trên từng sản phẩm. Khách hàng có thể chọn sản phẩm, chọn gói, điền thông tin, upload hồ sơ nếu cần, thanh toán mock, ký hợp đồng/kích hoạt nếu flow yêu cầu; hệ thống sau đó chuyển hồ sơ sang nhân viên kinh doanh phụ trách.

## Design system

| Token | Giá trị |
| --- | --- |
| Font | Be Vietnam Pro |
| Navy chính | `#003087` |
| Navy đậm | `#001f5c` |
| Navy nhạt | `#e8eef8` |
| Đỏ accent | `#d62b2b` |
| Xanh success | `#1a7d4a` |
| Vàng badge | `#f5a623` |
| Xám nền | `#f0f2f7` |
| Border | `#d0d5e0` |
| Card radius | `12px` |
| Input radius | `6px` |

## Pages

- `index.html`: Trang chủ, hero, sản phẩm nổi bật, lý do chọn Nacencomm, CTA.
- `products.html`: Danh mục 14 sản phẩm, nhóm theo lĩnh vực.
- `product-detail.html?slug=:slug`: Chi tiết sản phẩm, gói cước, quy trình, CTA sticky mobile.
- `register.html?slug=:slug`: Form đăng ký universal, render theo `flowType`.
- `register-upload.html`: Upload tách riêng cho flow cũ/dự phòng.
- `register-status.html`: Timeline trạng thái hồ sơ.
- `register-activate.html`: Nhập mã kích hoạt 6 chữ số.

## Flow mua hàng tổng quát

1. Khách hàng vào trang sản phẩm và nhấn **Mua ngay**.
2. Chọn gói, nhập thông tin doanh nghiệp/cá nhân.
3. Upload hồ sơ pháp lý nếu sản phẩm yêu cầu.
4. Xác nhận thông tin và chọn phương thức thanh toán mock.
5. Hệ thống tạo mã hồ sơ `NCM-xxxxxx` và mã kinh doanh `NCM-KD-xxxxxx`.
6. Nhân viên kinh doanh liên hệ để chốt hợp đồng, thanh toán thực tế và bàn giao.
7. Khách hàng theo dõi trạng thái, ký hợp đồng/kích hoạt nếu có.

## Sản phẩm

| # | Tên sản phẩm | Slug | Nhóm | Flow |
| --- | --- | --- | --- | --- |
| 1 | Chữ ký số USB Token | `chu-ky-so-token` | PKI | `standard_upload` |
| 2 | Remote Signing | `remote-signing` | PKI | `remote_signing` |
| 3 | CA2 Sign Platform | `ca2-sign-platform` | PKI | `consult` |
| 4 | Hóa đơn điện tử CA2-EInvoice | `hoa-don-dien-tu` | Kế toán - Thuế | `standard_upload` |
| 5 | Phần mềm kế toán | `phan-mem-ke-toan` | Kế toán - Thuế | `standard_form` |
| 6 | Phần mềm bảo hiểm | `phan-mem-bao-hiem` | Bảo hiểm | `standard_form` |
| 7 | Chấm công - Tính lương | `cham-cong-tinh-luong` | Nhân sự | `standard_form` |
| 8 | Rà soát lỗ hổng - Security | `security-pentest` | An ninh mạng | `consult_schedule` |
| 9 | Tư vấn & Xây dựng hạ tầng An ninh | `tu-van-ha-tang-anninh` | An ninh mạng | `consult` |
| 10 | Cung cấp tài khoản đấu thầu | `dau-thau-online` | Chính phủ điện tử | `standard_upload` |
| 11 | Dịch vụ chuyển đổi số | `chuyen-doi-so` | Chuyển đổi số | `consult_survey` |
| 12 | STEM Học tập | `stem-hoc-tap` | Giáo dục | `course_register` |
| 13 | CA2 CO-VAN - Khai báo CO | `ca2-co-van` | Xuất nhập khẩu | `standard_upload` |
| 14 | eKYC - Xác thực điện tử | `ekyc` | PKI | `consult` |

## Flow types

| Flow | Mô tả | Bước |
| --- | --- | --- |
| `standard_form` | Thông tin, gói cước, xác nhận, thanh toán | 4 |
| `standard_upload` | Thông tin, gói cước, upload, xác nhận, thanh toán | 5 |
| `remote_signing` | Thông tin DN, ĐDPL, gói, upload, xác nhận, thanh toán, ký HĐ, kích hoạt | 8 |
| `consult` | Thông tin ngắn, xác nhận tư vấn | 2 |
| `consult_schedule` | Thông tin, mô tả hệ thống, đặt lịch khảo sát | 3 |
| `consult_survey` | Thông tin, khảo sát nhu cầu, xác nhận | 3 |
| `course_register` | Thông tin, chọn khóa học, xác nhận, thanh toán | 4 |

## Validate rules

- Tên DN/cá nhân: không rỗng, tối thiểu 2 ký tự.
- MST: 10-13 chữ số.
- Người liên hệ: không rỗng.
- SĐT: bắt đầu bằng `0`, 9-11 chữ số.
- Email: đúng định dạng email.
- Địa chỉ: không rỗng.
- CCCD/CMND: 9 hoặc 12 chữ số.
- Ngày cấp: không được ở tương lai.
- Gói cước: bắt buộc chọn.
- File upload: JPG, PNG, PDF, tối đa 10MB/file trong bản thực tế; demo nhấn để mô phỏng.
- PIN kích hoạt: 6 chữ số.

## Ghi chú kỹ thuật

- Dự án chạy dạng static HTML/CSS/JS.
- Dữ liệu sản phẩm nằm trong `js/products-data.js`.
- Flow đăng ký nằm trong `js/flow-engine.js` và `js/register-app.js`.
- State demo lưu trong `sessionStorage` qua `js/step-controller.js`.
- PDF mock dùng `js/pdf-mock.js` và jsPDF CDN.
- Chạy local bằng `python -m http.server 3000` rồi mở `http://localhost:3000`.
