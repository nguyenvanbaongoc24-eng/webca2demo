/**
 * Registration Flow Engine
 * Handles all 7 flow types from the spec:
 * - standard_form (4 steps)
 * - standard_upload (5 steps)
 * - remote_signing (8 steps)
 * - consult (2 steps)
 * - consult_schedule (3 steps)
 * - consult_survey (3 steps)
 * - course_register (4 steps)
 */

const FLOW_CONFIGS = {
    standard_form: {
        steps: [
            { id: 'package', label: 'Gói cước' },
            { id: 'info', label: 'Thông tin' },
            { id: 'payment', label: 'Thanh toán' }
        ]
    },
    standard_vneid: {
        steps: [
            { id: 'package', label: 'Gói cước' },
            { id: 'info', label: 'Thông tin' },
            { id: 'payment', label: 'Thanh toán' },
            { id: 'contract', label: 'Ký HĐ VNeID' }
        ]
    },
    standard_upload: {
        steps: [
            { id: 'package', label: 'Gói cước' },
            { id: 'info', label: 'Thông tin' },
            { id: 'upload', label: 'Hồ sơ' },
            { id: 'payment', label: 'Thanh toán' }
        ]
    },
    remote_signing: {
        steps: [
            { id: 'package', label: 'Gói cước' },
            { id: 'info', label: 'Thông tin DN' },
            { id: 'legal', label: 'Thông tin ĐDPL' },
            { id: 'payment', label: 'Thanh toán' },
            { id: 'contract', label: 'Ký HĐ VNeID' },
            { id: 'activate', label: 'Kích hoạt' }
        ]
    },
    consult: {
        steps: [
            { id: 'info', label: 'Thông tin' },
            { id: 'confirm', label: 'Xác nhận' }
        ]
    },
    consult_schedule: {
        steps: [
            { id: 'info', label: 'Thông tin' },
            { id: 'system', label: 'Mô tả hệ thống' },
            { id: 'confirm', label: 'Đặt lịch' }
        ]
    },
    consult_survey: {
        steps: [
            { id: 'info', label: 'Thông tin' },
            { id: 'survey', label: 'Khảo sát' },
            { id: 'confirm', label: 'Xác nhận' }
        ]
    },
    course_register: {
        steps: [
            { id: 'info', label: 'Thông tin' },
            { id: 'course', label: 'Khóa học' },
            { id: 'payment', label: 'Thanh toán' }
        ]
    }
};

// Extra fields config per product
const EXTRA_FIELDS = {
    'chu-ky-so-token': [
        { name: 'nguoi_ddpl', label: 'Người đại diện pháp luật', type: 'text', required: true },
        { name: 'cccd', label: 'Số CCCD/CMND', type: 'text', required: true, validate: 'cccd' },
        { name: 'cccd_date', label: 'Ngày cấp CCCD', type: 'date', required: true, validate: 'cccd_date' }
    ],
    'remote-signing': [
        { name: 'nguoi_ddpl', label: 'Người đại diện pháp luật', type: 'text', required: true },
        { name: 'cccd', label: 'Số CCCD/CMND', type: 'text', required: true, validate: 'cccd' },
        { name: 'cccd_date', label: 'Ngày cấp CCCD', type: 'date', required: true, validate: 'cccd_date' },
        { name: 'cccd_place', label: 'Nơi cấp', type: 'text', required: true }
    ],
    'hoa-don-dien-tu': [
        { name: 'pm_ke_toan', label: 'Phần mềm kế toán đang dùng', type: 'select', options: ['MISA', 'Fast Accounting', 'Bravo', 'SAP', 'Khác'], required: true },
        { name: 'so_hoa_don', label: 'Số lượng hóa đơn dự kiến/tháng', type: 'number', required: true }
    ],
    'phan-mem-ke-toan': [
        { name: 'so_nguoi_dung', label: 'Số người dùng', type: 'number', required: true },
        { name: 'phan_mem_cu', label: 'Phần mềm đang dùng (nếu có)', type: 'text', required: false }
    ],
    'phan-mem-bao-hiem': [
        { name: 'so_nhan_vien', label: 'Số nhân viên', type: 'number', required: true }
    ],
    'cham-cong-tinh-luong': [
        { name: 'so_nhan_vien', label: 'Số lượng nhân viên', type: 'number', required: true },
        { name: 'thiet_bi_cham_cong', label: 'Thiết bị chấm công hiện tại', type: 'select', options: ['Chưa có', 'Vân tay', 'Khuôn mặt', 'Thẻ từ', 'Khác'], required: false }
    ],
    'security-pentest': [
        { name: 'mo_ta_he_thong', label: 'Mô tả hệ thống cần đánh giá', type: 'textarea', required: true },
        { name: 'quy_mo', label: 'Quy mô hệ thống', type: 'select', options: ['< 10 máy chủ', '10-50 máy chủ', '50-200 máy chủ', '> 200 máy chủ'], required: true },
        { name: 'ngay_khao_sat', label: 'Ngày khảo sát mong muốn', type: 'date', required: true }
    ],
    'dau-thau-online': [
        { name: 'don_vi_moi_thau', label: 'Tên đơn vị mời thầu', type: 'text', required: false },
        { name: 'linh_vuc_thau', label: 'Lĩnh vực đấu thầu', type: 'select', options: ['Xây dựng', 'CNTT', 'Y tế', 'Giáo dục', 'Giao thông', 'Khác'], required: false }
    ],
    'chuyen-doi-so': [
        { name: 'linh_vuc', label: 'Lĩnh vực kinh doanh', type: 'text', required: true },
        { name: 'quy_mo_dn', label: 'Quy mô doanh nghiệp', type: 'select', options: ['< 10 nhân viên', '10-50', '50-200', '200-500', '> 500'], required: true },
        { name: 'van_de_hien_tai', label: 'Vấn đề cần giải quyết', type: 'textarea', required: true }
    ],
    'stem-hoc-tap': [
        { name: 'truong_to_chuc', label: 'Trường / Tổ chức', type: 'text', required: true },
        { name: 'so_hoc_vien', label: 'Số lượng học viên dự kiến', type: 'number', required: true },
        { name: 'khoa_hoc', label: 'Khóa học quan tâm', type: 'select', options: ['Lập trình Python', 'Lập trình Web', 'Robotics', 'An toàn thông tin', 'Kỹ năng số cơ bản'], required: true }
    ]
};

function getFlowConfig(flowType) {
    return FLOW_CONFIGS[flowType] || FLOW_CONFIGS.standard_form;
}

function getExtraFields(slug) {
    return EXTRA_FIELDS[slug] || [];
}
