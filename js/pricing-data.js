/**
 * Pricing Data for Nacencomm CA2 Products
 * Source: nacencomm-pricing-flow-spec.md
 * 
 * Giá CKS Token: Tham khảo từ đại lý (cần xác nhận tại nacencomm.vn/bang-gia)
 * Giá RS và các SP khác: Liên hệ (chưa có giá chính thức)
 */

const PRICING_DATA = {

    // ===== CKS TOKEN =====
    "cks-token": {
        name: "Chữ ký số USB Token",
        icon: "🔑",
        slug: "chu-ky-so-token",
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
        slug: "remote-signing",
        tabs: ["Doanh Nghiệp / Tổ Chức", "HKD / Cá Nhân"],
        subtabs: ["Theo năm", "Theo lượt ký"],
        packages: {
            "theo-nam": {
                "Doanh Nghiệp / Tổ Chức": [
                    { label: "1 Năm", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: false, note: "" },
                    { label: "2 Năm", duration: "24 tháng", price: null, priceStr: "Liên hệ", popular: true, note: "Phổ biến" },
                    { label: "3 Năm", duration: "36 tháng", price: null, priceStr: "Liên hệ", popular: false, note: "Ưu đãi nhất" }
                ],
                "HKD / Cá Nhân": [
                    { label: "1 Năm", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: false, note: "" },
                    { label: "2 Năm", duration: "24 tháng", price: null, priceStr: "Liên hệ", popular: true, note: "Phổ biến" },
                    { label: "3 Năm", duration: "36 tháng", price: null, priceStr: "Liên hệ", popular: false, note: "Ưu đãi nhất" }
                ]
            },
            "theo-luot": {
                "Doanh Nghiệp / Tổ Chức": [
                    { label: "50 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: false, note: "" },
                    { label: "100 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: true, note: "Phổ biến" },
                    { label: "500 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: false, note: "" }
                ],
                "HKD / Cá Nhân": [
                    { label: "20 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: false, note: "" },
                    { label: "50 lượt", duration: "Không hạn", price: null, priceStr: "Liên hệ", popular: true, note: "Phổ biến" }
                ]
            }
        }
    },

    // ===== HOÁ ĐƠN ĐIỆN TỬ =====
    "hoa-don": {
        name: "Hoá Đơn Điện Tử",
        icon: "🧾",
        slug: "hoa-don-dien-tu",
        tabs: ["Doanh Nghiệp"],
        packages: {
            "Doanh Nghiệp": [
                { label: "300 HĐ/năm", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: false, note: "DN nhỏ" },
                { label: "1.000 HĐ/năm", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: true, note: "Phổ biến" },
                { label: "3.000 HĐ/năm", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: false, note: "" },
                { label: "Không giới hạn", duration: "12 tháng", price: null, priceStr: "Liên hệ", popular: false, note: "Enterprise" }
            ]
        }
    },

    // ===== PHẦN MỀM BẢO HIỂM =====
    "bao-hiem": {
        name: "Phần Mềm Bảo Hiểm",
        icon: "🛡️",
        slug: "phan-mem-bao-hiem",
        tabs: ["Theo quy mô"],
        packages: {
            "Theo quy mô": [
                { label: "≤ 10 NV", duration: "", price: null, priceStr: "Liên hệ", popular: false, note: "" },
                { label: "≤ 50 NV", duration: "", price: null, priceStr: "Liên hệ", popular: true, note: "Phổ biến" },
                { label: "≤ 200 NV", duration: "", price: null, priceStr: "Liên hệ", popular: false, note: "" },
                { label: "Không giới hạn", duration: "", price: null, priceStr: "Liên hệ", popular: false, note: "Enterprise" }
            ]
        }
    },

    // ===== CA2 PLATFORM =====
    "ca2-platform": {
        name: "CA2 Sign Platform",
        icon: "🏗️",
        slug: "ca2-sign-platform",
        type: "consult",
        description: "CA2 Sign Platform là giải pháp Enterprise. Giá được tính theo quy mô triển khai và số lượng người dùng.",
        cta: "Đăng ký nhận báo giá"
    }
};

// Map product slug → pricing key
const SLUG_TO_PRICING = {
    'chu-ky-so-token': 'cks-token',
    'remote-signing': 'remote-signing',
    'hoa-don-dien-tu': 'hoa-don',
    'phan-mem-bao-hiem': 'bao-hiem',
    'ca2-sign-platform': 'ca2-platform'
};

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
