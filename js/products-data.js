const PRODUCTS = [
  {
    slug: "chu-ky-so-token",
    name: "Chữ ký số USB Token",
    shortName: "Chữ ký số",
    icon: "🔑",
    group: "PKI",
    tagline: "Chứng thư số công cộng CA2 – Ký văn bản điện tử pháp lý",
    description: "Chữ ký số CA2 Nacencomm giúp cá nhân, doanh nghiệp ký hồ sơ điện tử, kê khai thuế, hải quan, BHXH và các giao dịch điện tử có giá trị pháp lý.",
    features: ["Kê khai thuế điện tử", "Hải quan điện tử", "BHXH điện tử", "Ký hợp đồng online"],
    packages: [
      { name: "Gói 1 Năm", price: "1.638.000 đ" },
      { name: "Gói 2 Năm", price: "2.189.000 đ" },
      { name: "Gói 3 Năm", price: "3.100.000 đ" }
    ],
    flowType: "standard_vneid",
    requireUpload: false
  },
  {
    slug: "remote-signing",
    name: "Remote Signing",
    shortName: "Ký số từ xa",
    icon: "📱",
    group: "PKI",
    tagline: "Ký số từ xa qua điện thoại – Không cần USB Token",
    description: "Giải pháp chữ ký số từ xa CA2 Remote Signing: ký tài liệu mọi lúc mọi nơi chỉ bằng smartphone, đảm bảo an toàn và hợp pháp theo Nghị định 130/2018/NĐ-CP.",
    features: ["Không cần USB Token", "Ký mọi nơi qua app", "Xác thực sinh trắc học", "Tích hợp VNeID"],
    packages: [
      { name: "Gói 1 Năm", price: "Liên hệ" },
      { name: "Gói 2 Năm", price: "Liên hệ" },
      { name: "Gói 3 Năm", price: "Liên hệ" },
      { name: "Gói Lượt ký", price: "Liên hệ" }
    ],
    flowType: "remote_signing",
    requireUpload: true,
    uploadDocs: ["ĐKSD (scan)", "Hợp đồng (scan)", "GPKD gốc", "CCCD 2 mặt"]
  },
  {
    slug: "ca2-sign-platform",
    name: "CA2 Sign Platform",
    shortName: "Sign Platform",
    icon: "🏗️",
    group: "PKI",
    tagline: "Nền tảng ký số tập trung cho doanh nghiệp & tổ chức lớn",
    description: "CA2 Platform cung cấp giải pháp ký số quy mô lớn, tích hợp API, quản lý tập trung, phù hợp ngân hàng, bảo hiểm, cơ quan nhà nước.",
    features: ["API tích hợp hệ thống", "Quản lý tập trung", "Batch signing", "Audit log"],
    packages: [{ name: "Enterprise", price: "Liên hệ" }],
    flowType: "consult",
    requireUpload: false
  },
  {
    slug: "hoa-don-dien-tu",
    name: "Hóa đơn điện tử CA2-EInvoice",
    shortName: "Hóa đơn điện tử",
    icon: "🧾",
    group: "Kế toán - Thuế",
    tagline: "Phát hành hóa đơn điện tử đúng chuẩn Nghị định 123/2020/NĐ-CP",
    description: "CA2-EInvoice hỗ trợ doanh nghiệp phát hành, quản lý hóa đơn điện tử có mã xác thực của cơ quan thuế, tích hợp trực tiếp với hệ thống kế toán.",
    features: ["Kết nối cơ quan thuế", "Phát hành tức thì", "Lưu trữ điện tử", "Tích hợp phần mềm kế toán"],
    packages: [
      { name: "Gói 300 HĐ/năm", price: "Liên hệ" },
      { name: "Gói 1.000 HĐ/năm", price: "Liên hệ" },
      { name: "Gói 3.000 HĐ/năm", price: "Liên hệ" },
      { name: "Gói Không giới hạn", price: "Liên hệ" }
    ],
    flowType: "standard_upload",
    requireUpload: true,
    uploadDocs: ["GPKD", "Quyết định sử dụng HĐĐT"]
  },
  {
    slug: "phan-mem-ke-toan",
    name: "Phần mềm kế toán",
    shortName: "Kế toán",
    icon: "📊",
    group: "Kế toán - Thuế",
    tagline: "Quản lý tài chính kế toán toàn diện cho doanh nghiệp vừa và nhỏ",
    description: "Phần mềm kế toán CA2 giúp doanh nghiệp quản lý sổ sách, lập báo cáo tài chính, kê khai thuế nhanh chóng và chính xác.",
    features: ["Kê khai thuế tự động", "Báo cáo tài chính chuẩn", "Quản lý công nợ", "Kết nối ngân hàng"],
    packages: [
      { name: "Gói Cơ bản", price: "Liên hệ" },
      { name: "Gói Tiêu chuẩn", price: "Liên hệ" },
      { name: "Gói Nâng cao", price: "Liên hệ" }
    ],
    flowType: "standard_form",
    requireUpload: false,
    extraFields: ["so_nguoi_dung", "phan_mem_cu"]
  },
  {
    slug: "phan-mem-bao-hiem",
    name: "Phần mềm bảo hiểm",
    shortName: "Bảo hiểm",
    icon: "🛡️",
    group: "Bảo hiểm",
    tagline: "Quản lý hợp đồng bảo hiểm & kê khai BHXH trực tuyến",
    description: "Giải pháp phần mềm quản lý bảo hiểm xã hội, bảo hiểm y tế, khai báo điện tử và kết nối cơ quan BHXH.",
    features: ["Kê khai BHXH điện tử", "Quản lý hợp đồng", "Nhắc nhở đóng bảo hiểm", "Báo cáo tự động"],
    packages: [
      { name: "≤ 10 NV", price: "Liên hệ" },
      { name: "≤ 50 NV", price: "Liên hệ" },
      { name: "≤ 200 NV", price: "Liên hệ" },
      { name: "Không giới hạn", price: "Liên hệ" }
    ],
    flowType: "standard_form",
    requireUpload: false,
    extraFields: ["so_nhan_vien"]
  },
  {
    slug: "cham-cong-tinh-luong",
    name: "Chấm công – Tính lương",
    shortName: "HR",
    icon: "⏰",
    group: "Nhân sự",
    tagline: "Tự động hóa chấm công, tính lương và quản lý nhân sự",
    description: "Hệ thống chấm công điện tử tích hợp tính lương tự động, quản lý phép nghỉ, hợp đồng lao động và báo cáo nhân sự.",
    features: ["Chấm công khuôn mặt / vân tay", "Tính lương tự động", "Quản lý ca làm việc", "Báo cáo thuế TNCN"],
    packages: [
      { name: "≤ 20 NV", price: "Liên hệ" },
      { name: "≤ 100 NV", price: "Liên hệ" },
      { name: "Không giới hạn", price: "Liên hệ" }
    ],
    flowType: "standard_form",
    requireUpload: false,
    extraFields: ["so_nhan_vien", "thiet_bi_cham_cong"]
  },
  {
    slug: "security-pentest",
    name: "Rà soát lỗ hổng – Security",
    shortName: "Security",
    icon: "🔍",
    group: "An ninh mạng",
    tagline: "Kiểm thử bảo mật & đánh giá rủi ro hệ thống CNTT",
    description: "Dịch vụ pentest, rà soát lỗ hổng bảo mật, đánh giá an toàn thông tin theo tiêu chuẩn ISO 27001 và quy định của Bộ TT&TT.",
    features: ["Pentest Web App", "Pentest hạ tầng mạng", "Đánh giá ATTT", "Báo cáo & khuyến nghị"],
    packages: [
      { name: "Gói Cơ bản", price: "Liên hệ" },
      { name: "Gói Toàn diện", price: "Liên hệ" },
      { name: "Gói Doanh nghiệp", price: "Liên hệ" }
    ],
    flowType: "consult_schedule",
    requireUpload: false,
    extraFields: ["mo_ta_he_thong", "quy_mo", "ngay_khao_sat"]
  },
  {
    slug: "tu-van-ha-tang-anninh",
    name: "Tư vấn & Xây dựng hạ tầng An ninh",
    shortName: "Hạ tầng ATTT",
    icon: "🏛️",
    group: "An ninh mạng",
    tagline: "Thiết kế và triển khai hạ tầng an toàn thông tin cho tổ chức",
    description: "Nacencomm tư vấn, thiết kế và triển khai hạ tầng PKI, HSM, hệ thống xác thực điện tử và an ninh mạng cho cơ quan nhà nước và doanh nghiệp lớn.",
    features: ["Thiết kế PKI nội bộ", "Triển khai HSM", "Xác thực 2 lớp", "Đào tạo an toàn thông tin"],
    packages: [{ name: "Liên hệ tư vấn", price: "Liên hệ" }],
    flowType: "consult",
    requireUpload: false
  },
  {
    slug: "dau-thau-online",
    name: "Cung cấp tài khoản đấu thầu",
    shortName: "Đấu thầu",
    icon: "📋",
    group: "Chính phủ điện tử",
    tagline: "Đăng ký tài khoản hệ thống đấu thầu quốc gia muasamcong.mpi.gov.vn",
    description: "Hỗ trợ doanh nghiệp đăng ký, cấp và gia hạn tài khoản tham gia đấu thầu điện tử trên hệ thống mua sắm công quốc gia.",
    features: ["Đăng ký tài khoản nhanh", "Hỗ trợ hồ sơ pháp lý", "Tư vấn thủ tục", "Gia hạn tài khoản"],
    packages: [
      { name: "Cấp mới", price: "Liên hệ" },
      { name: "Gia hạn", price: "Liên hệ" }
    ],
    flowType: "standard_upload",
    requireUpload: true,
    uploadDocs: ["GPKD/Quyết định thành lập", "CCCD NDDPL", "Giấy ủy quyền (nếu có)"]
  },
  {
    slug: "chuyen-doi-so",
    name: "Dịch vụ chuyển đổi số",
    shortName: "CĐS",
    icon: "🚀",
    group: "Chuyển đổi số",
    tagline: "Đồng hành toàn diện trên hành trình chuyển đổi số doanh nghiệp",
    description: "Nacencomm cung cấp giải pháp chuyển đổi số tổng thể: từ tư vấn chiến lược, triển khai hệ thống đến đào tạo nhân sự.",
    features: ["Tư vấn chiến lược CĐS", "Triển khai hệ thống", "Đào tạo nhân sự", "Hỗ trợ vận hành"],
    packages: [
      { name: "Khảo sát miễn phí", price: "Miễn phí" },
      { name: "Gói triển khai", price: "Liên hệ" }
    ],
    flowType: "consult_survey",
    requireUpload: false,
    extraFields: ["linh_vuc", "quy_mo_dn", "van_de_hien_tai"]
  },
  {
    slug: "stem-hoc-tap",
    name: "STEM Học tập",
    shortName: "STEM",
    icon: "🎓",
    group: "Giáo dục",
    tagline: "Nền tảng học STEM & công nghệ số cho học sinh, sinh viên",
    description: "Chương trình đào tạo STEM, lập trình, an toàn thông tin và kỹ năng số dành cho trường học, trung tâm và cá nhân.",
    features: ["Lập trình cơ bản – nâng cao", "Kỹ năng số", "An toàn thông tin", "Chứng chỉ kỹ năng số"],
    packages: [
      { name: "Gói Cá nhân", price: "Liên hệ" },
      { name: "Gói Trường học", price: "Liên hệ" },
      { name: "Gói Trung tâm", price: "Liên hệ" }
    ],
    flowType: "course_register",
    requireUpload: false,
    extraFields: ["truong_to_chuc", "so_hoc_vien", "khoa_hoc"]
  },
  {
    slug: "ca2-co-van",
    name: "CA2 CO-VAN – Khai báo CO",
    shortName: "CO-VAN",
    icon: "📦",
    group: "Xuất nhập khẩu",
    tagline: "Số hóa quy trình kê khai Giấy chứng nhận xuất xứ (CO) điện tử",
    description: "CA2 CO-VAN giúp doanh nghiệp XNK số hóa hoàn toàn quy trình khai báo CO, kết nối hệ thống tiếp nhận tập trung VCCI, giảm chi phí và thời gian.",
    features: ["Khai báo CO điện tử", "Kết nối VCCI tự động", "Lưu trữ pháp lý lâu dài", "Cập nhật chuẩn thông điệp"],
    packages: [
      { name: "Gói Doanh nghiệp nhỏ", price: "Liên hệ" },
      { name: "Gói Tiêu chuẩn", price: "Liên hệ" },
      { name: "Gói Lớn", price: "Liên hệ" }
    ],
    flowType: "standard_upload",
    requireUpload: true,
    uploadDocs: ["GPKD", "Hợp đồng thương mại", "Tờ khai hải quan mẫu"]
  },
  {
    slug: "ekyc",
    name: "eKYC – Xác thực điện tử",
    shortName: "eKYC",
    icon: "🪪",
    group: "PKI",
    tagline: "Xác thực danh tính điện tử tích hợp VNeID & sinh trắc học",
    description: "Giải pháp eKYC tích hợp nhận diện khuôn mặt, đọc chip CCCD, xác thực qua VNeID – phù hợp ngân hàng, bảo hiểm, fintech và cơ quan nhà nước.",
    features: ["Nhận diện khuôn mặt", "Đọc chip CCCD/hộ chiếu", "Tích hợp VNeID", "API linh hoạt"],
    packages: [
      { name: "Demo API miễn phí", price: "Miễn phí" },
      { name: "Gói sản xuất", price: "Liên hệ" }
    ],
    flowType: "consult",
    requireUpload: false
  }
];

if (typeof module !== 'undefined') {
  module.exports = PRODUCTS;
}
