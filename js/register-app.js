// ==========================================
// FORM ĐĂNG KÝ V2 - ACCORDION + SIDEBAR
// ==========================================

function initRegisterPage() {
    const productSlug = sessionStorage.getItem('selected_product')  || 'chu-ky-so-token';
    const pkgLabel    = sessionStorage.getItem('selected_package')  || 'Gói 2 Năm';
    const doiTuong    = sessionStorage.getItem('selected_doituong') || 'Doanh Nghiệp / Tổ Chức';
    const qty         = parseInt(sessionStorage.getItem('selected_qty')) || 1;
  
    // Tìm data sản phẩm
    let productData = null;
    if (typeof PRICING_DATA !== 'undefined') {
        productData = PRICING_DATA[productSlug];
    } else if (typeof PRODUCTS !== 'undefined') {
        // Fallback just in case
        productData = PRODUCTS.find(p => p.slug === productSlug);
    }
    
    const productName = productData ? productData.name : 'Chữ ký số USB Token';
    const productIcon = productData ? productData.icon : '🔑';
    
    // Tìm giá từ PRICING_DATA
    const priceStr = getPriceFromPricingData(productSlug, doiTuong, pkgLabel);
    const priceNum = parseInt(sessionStorage.getItem('selected_price_num')) || 0;
    
    let totalStr = priceStr;
    if (priceNum > 0) {
        totalStr = (priceNum * qty).toLocaleString('vi-VN') + ' đ';
    }

    // Điền vào cart section
    document.getElementById('cart_icon').textContent = productIcon;
    document.getElementById('cart_name').textContent = productName;
    document.getElementById('cart_pkg').textContent = pkgLabel;
    
    // Update quantity in HTML
    const qtyCells = document.querySelectorAll('.cart-table td:nth-child(3)');
    if (qtyCells.length > 0) qtyCells[0].textContent = qty;
    
    document.getElementById('cart_price').textContent = priceStr;
    document.getElementById('cart_total').textContent = totalStr;
  
    // Điền vào sidebar
    document.getElementById('sb_productName').textContent = productName;
    document.getElementById('sb_duration').textContent = pkgLabel;
    document.getElementById('sb_pkgLabel').textContent = pkgLabel;
    document.getElementById('sb_priceVal').textContent = totalStr;
    document.getElementById('sb_totalVal').textContent = totalStr;
    
    // Update sidebar quantity
    const sbQtyCells = document.querySelectorAll('.sidebar-row span:last-child');
    if (sbQtyCells.length > 0) sbQtyCells[0].textContent = qty;
  
    // Render upsell
    renderUpsell(productSlug);
  
    // Render upload section nếu cần
    // Kiểm tra trong PRODUCTS data cũ nếu cần, hoặc từ PRICING_DATA 
    // Do PRICING_DATA không có requireUpload, ta tìm trong PRODUCTS
    let requireUpload = false;
    let uploadDocs = [];
    if (typeof PRODUCTS !== 'undefined') {
        const prod = PRODUCTS.find(p => p.slug === productSlug);
        if (prod && prod.requireUpload) {
            requireUpload = true;
            uploadDocs = prod.uploadDocs || ["GPKD / CCCD", "Biểu mẫu đăng ký"];
        }
    }
    // Check if it's eKYC or dau-thau from OTHER_PRODUCTS mapping if we integrated it
    // For now just hardcode some known slugs
    if (['remote-signing', 'hoa-don-dien-tu', 'dau-thau-online', 'ca2-co-van'].includes(productSlug)) {
        requireUpload = true;
        uploadDocs = ["Giấy phép kinh doanh", "CCCD/CMND Người đại diện", "Hợp đồng cung cấp dịch vụ", "Phiếu yêu cầu"];
    }

    if (requireUpload) {
      renderUploadSection(uploadDocs);
    } else {
      const uploadSec = document.getElementById('sec_upload');
      if (uploadSec) uploadSec.remove();
    }
}

function getPriceFromPricingData(slug, doiTuong, pkgLabel) {
    if (typeof PRICING_DATA === 'undefined') return "2.189.000 đ";
    const data = PRICING_DATA[slug];
    if (!data) return "Liên hệ";
    
    // Special case for remote signing
    if (slug === 'remote-signing' && data.packages) {
        if (data.packages['theo-nam'] && data.packages['theo-nam'][doiTuong]) {
            const found = data.packages['theo-nam'][doiTuong].find(p => p.label === pkgLabel);
            if (found) return found.priceStr;
        }
        if (data.packages['theo-luot'] && data.packages['theo-luot'][doiTuong]) {
             const found = data.packages['theo-luot'][doiTuong].find(p => p.label === pkgLabel);
             if (found) return found.priceStr;
        }
    } else if (data.packages && data.packages[doiTuong]) {
        const found = data.packages[doiTuong].find(p => p.label === pkgLabel);
        if (found) return found.priceStr;
    } else if (data.packages) {
        // Fallback
        const keys = Object.keys(data.packages);
        for(let k of keys) {
             const found = data.packages[k].find(p => p.label === pkgLabel);
             if (found) return found.priceStr;
        }
    }
    return "2.189.000 đ";
}
  
// Accordion toggle
window.toggleSection = function(id) {
    document.getElementById(id).classList.toggle('open');
};

// Phương thức thanh toán
window.onSelectPT = function(radio) {
    document.querySelectorAll('.payment-opt').forEach(o => o.classList.remove('selected'));
    radio.parentElement.classList.add('selected');
};

// Đối tượng hoá đơn
window.onDoiTuongHD = function(radio) {
    const showBusiness = ['dn', 'hkd'].includes(radio.value);
    document.getElementById('fields_dn_hkd').style.display = showBusiness ? 'grid' : 'none';
};

// Validate & Submit
window.submitForm = function() {
    if (!document.getElementById('chkAgree').checked) {
        document.getElementById('err_agree').style.display = 'block';
        return;
    } else {
        document.getElementById('err_agree').style.display = 'none';
    }

    const fields = ['hoTen','sdt','chucDanh','emailKichHoat','emailHD', 'tinhTp', 'phuongXa', 'diaChi'];
    const isBusiness = ['dn', 'hkd'].includes(document.querySelector('input[name="doiTuongHD"]:checked').value);
    if (isBusiness) {
        fields.push('maSoThue', 'tenDonVi');
    }

    let ok = true;
    fields.forEach(id => { 
        if (!v(id)) ok = false; 
    });

    if (!ok) {
        // Mở tất cả accordion để thấy lỗi
        document.querySelectorAll('.form-section').forEach(sec => sec.classList.add('open'));
        // Cuộn đến lỗi đầu tiên
        const firstErr = document.querySelector('.error');
        if(firstErr) firstErr.scrollIntoView({behavior: 'smooth', block: 'center'});
        return;
    }

    // Pass -> Phân luồng Flow A hoặc Flow B
    const productSlug = sessionStorage.getItem('selected_product')  || 'chu-ky-so-token';
    const doiTuongVal = document.querySelector('input[name="doiTuongHD"]:checked').value; // 'dn', 'hkd', 'cn'
    const flow = determineFlow(productSlug, doiTuongVal);

    if (flow === 'flow_vneid') {
        goToVNeIDFlow();
    } else {
        goToSalesFlow();
    }
};

function determineFlow(productSlug, doiTuong) {
    const isRS = productSlug === 'remote-signing';
    const isHKDorCN = ['hkd', 'cn'].includes(doiTuong);
  
    if (isRS && isHKDorCN) return 'flow_vneid';
    return 'flow_sales';
}

window.v = function(id) {
    const el = document.getElementById(id);
    const err = document.getElementById('err_' + id);
    if (!el || !err) return true;
    
    let isValid = true;
    if (!el.value.trim()) {
        isValid = false;
    } else if (el.type === 'email' && !el.value.includes('@')) {
        isValid = false;
    }

    if (!isValid) {
        el.classList.add('error');
        err.classList.add('show');
    } else {
        el.classList.remove('error');
        err.classList.remove('show');
    }
    return isValid;
};

window.clearErr = function(el) {
    el.classList.remove('error');
    const err = document.getElementById('err_' + el.id);
    if (err) err.classList.remove('show');
};

function renderUploadSection(docs) {
    const grid = document.getElementById('upload_grid');
    if (!grid) return;
    grid.innerHTML = docs.map((doc, i) => `
        <div class="upload-item" onclick="document.getElementById('file_${i}').click()">
            <div class="upload-icon">📄</div>
            <div class="upload-label">${doc}</div>
            <div class="upload-note">Click để tải lên (Tối đa 10MB)</div>
            <input type="file" id="file_${i}" style="display:none" accept="image/*,application/pdf" onchange="handleUpload(this)">
        </div>
    `).join('');
}

window.handleUpload = function(input) {
    if (input.files && input.files[0]) {
        const item = input.closest('.upload-item');
        item.classList.add('uploaded');
        item.querySelector('.upload-icon').textContent = '✅';
        item.querySelector('.upload-note').textContent = input.files[0].name;
    }
};

const UPSELL_MAP = {
    'chu-ky-so-token': [
        { icon: '🧾', name: 'Hoá đơn điện tử', priceFrom: 'Liên hệ', slug: 'hoa-don-dien-tu' },
        { icon: '📊', name: 'Phần mềm kế toán', priceFrom: 'Liên hệ', slug: 'phan-mem-ke-toan' },
        { icon: '📱', name: 'Remote Signing', priceFrom: 'Liên hệ', slug: 'remote-signing' }
    ],
    'remote-signing': [
        { icon: '🔑', name: 'Chữ ký số USB Token', priceFrom: '1.638.000đ', slug: 'chu-ky-so-token' },
        { icon: '🧾', name: 'Hoá đơn điện tử', priceFrom: 'Liên hệ', slug: 'hoa-don-dien-tu' },
        { icon: '🪪', name: 'eKYC – Xác thực điện tử', priceFrom: 'Liên hệ', slug: 'ekyc' }
    ],
    'hoa-don-dien-tu': [
        { icon: '📊', name: 'Phần mềm kế toán', priceFrom: 'Liên hệ', slug: 'phan-mem-ke-toan' },
        { icon: '🔑', name: 'Chữ ký số USB Token', priceFrom: '1.638.000đ', slug: 'chu-ky-so-token' },
        { icon: '⏰', name: 'Chấm công – Tính lương', priceFrom: 'Liên hệ', slug: 'cham-cong-tinh-luong' }
    ]
};

function renderUpsell(productSlug) {
    const grid = document.getElementById('upsell_grid');
    if (!grid) return;
    
    const upsells = UPSELL_MAP[productSlug] || UPSELL_MAP['chu-ky-so-token'];
    
    grid.innerHTML = upsells.map(u => `
        <div class="upsell-card" onclick="window.location.href='pricing.html?product=${u.slug}'">
            <div style="font-size: 24px;">${u.icon}</div>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: #003087;">${u.name}</div>
                <div style="font-size: 11px; color: #d62b2b;">Từ ${u.priceFrom}</div>
            </div>
            <button class="upsell-add-btn" type="button" title="Đăng ký thêm">+</button>
        </div>
    `).join('');
}

window.applyPromo = function() {
    const code = document.getElementById('maKM').value.trim();
    if(code) {
        alert("Đã áp dụng mã ưu đãi: " + code);
    }
};

window.downloadQuote = function() {
    const product  = document.getElementById('cart_name').textContent;
    const pkgLabel = document.getElementById('cart_pkg').textContent;
    alert(`Đang tải xuống báo giá PDF cho...\nSản phẩm: ${product}\nGói: ${pkgLabel}`);
};

// ==========================================
// FLOW ROUTING HANDLERS
// ==========================================

function goToSalesFlow() {
    const overlay = document.getElementById('flow-overlay');
    if (!overlay) return;
    
    // Hide all screens
    document.querySelectorAll('#flow-overlay > div').forEach(div => div.style.display = 'none');
    
    // Setup and show Flow B screen
    const screen = document.getElementById('screen_flow_b');
    overlay.style.display = 'flex';
    screen.style.display = 'block';

    // Mock ticket code
    const ticket = 'NCM-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    document.getElementById('ticketCode').textContent = ticket;
    
    // Summary
    document.getElementById('sc_product').textContent = document.getElementById('cart_name').textContent;
    document.getElementById('sc_pkg').textContent = document.getElementById('cart_pkg').textContent;
    document.getElementById('sc_email').textContent = document.getElementById('emailKichHoat').value || 'khachhang@email.com';
    document.getElementById('sc_sdt').textContent = document.getElementById('sdt').value || '09xxxxxxxx';
}

function goToVNeIDFlow() {
    const overlay = document.getElementById('flow-overlay');
    if (!overlay) return;
    
    // Hide all screens
    document.querySelectorAll('#flow-overlay > div').forEach(div => div.style.display = 'none');
    
    // Setup and show Flow A - Guide
    const screen = document.getElementById('screen_vneid_guide');
    overlay.style.display = 'flex';
    screen.style.display = 'block';

    document.getElementById('vn_email').textContent = document.getElementById('emailKichHoat').value || 'khachhang@email.com';
}

// Giả lập tải file PDF
window.mockDownload = function(type) {
    alert(`Đã tải xuống file PDF giả lập: ${type}`);
};

// Gọi khi người dùng bấm vào upload zone
window.triggerUpload = function(id) {
    document.getElementById('file_' + id).click();
};

window.onFileSelected = function(input, zoneId) {
    if (input.files && input.files[0]) {
        const zone = document.getElementById(zoneId);
        zone.classList.add('uploaded');
        zone.querySelector('span').textContent = '✅';
        zone.querySelector('p').textContent = input.files[0].name;
        
        checkUploadDocsStatus();
    }
};

function checkUploadDocsStatus() {
    const dksd = document.getElementById('uz_dksd').classList.contains('uploaded');
    const hdsd = document.getElementById('uz_hdsd').classList.contains('uploaded');
    
    const btn = document.getElementById('btnSubmitSigned');
    if (dksd && hdsd) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    } else {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    }
}

// Chuyển sang thẩm định
window.submitSignedDocs = function() {
    document.getElementById('screen_vneid_guide').style.display = 'none';
    document.getElementById('screen_vneid_review').style.display = 'block';
    
    document.getElementById('rev_email').textContent = document.getElementById('emailKichHoat').value || 'khachhang@email.com';
    document.getElementById('review_pending').style.display = 'block';
    document.getElementById('screen_approved').style.display = 'none';
    document.getElementById('screen_rejected').style.display = 'none';
};

window.mockApprove = function() {
    document.getElementById('review_pending').style.display = 'none';
    document.getElementById('screen_approved').style.display = 'block';
    
    // Sinh mã ngẫu nhiên
    const code = 'RS-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('activationCode').textContent = code;
    sessionStorage.setItem('mock_rs_code', code);
};

window.mockReject = function() {
    document.getElementById('review_pending').style.display = 'none';
    document.getElementById('screen_rejected').style.display = 'block';
};

window.goBackToUpload = function() {
    document.getElementById('screen_vneid_review').style.display = 'none';
    
    // Reset upload zones
    ['uz_dksd', 'uz_hdsd'].forEach(id => {
        const zone = document.getElementById(id);
        zone.classList.remove('uploaded');
        zone.querySelector('span').textContent = '☁️';
        zone.querySelector('p').textContent = id === 'uz_dksd' ? 'ĐKSD đã ký VNeID' : 'Hợp đồng đã ký VNeID';
        document.getElementById('file_' + id).value = '';
    });
    checkUploadDocsStatus();
    
    document.getElementById('screen_vneid_guide').style.display = 'block';
};

// Kích hoạt App
window.goToActivation = function() {
    document.getElementById('screen_vneid_review').style.display = 'none';
    document.getElementById('screen_vneid_activation').style.display = 'block';
};

window.onAppDownloaded = function() {
    const chk = document.getElementById('chk_downloaded');
    const act2 = document.getElementById('act2');
    if (chk.checked) {
        act2.classList.remove('disabled');
        act2.style.opacity = '1';
        act2.style.pointerEvents = 'auto';
    } else {
        act2.classList.add('disabled');
        act2.style.opacity = '0.5';
        act2.style.pointerEvents = 'none';
    }
};

window.formatCodeInput = function(input) {
    let val = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (val.length > 4) {
        val = val.slice(0,4) + '-' + val.slice(4);
    }
    input.value = val;
};

window.verifyCode = function() {
    const inputCode = document.getElementById('codeInput').value;
    const realCode = sessionStorage.getItem('mock_rs_code');
    const expected = realCode ? realCode.replace('RS-', '') : '';
    
    if (inputCode === expected || inputCode === '1234-5678') { // fallback allow 1234-5678
        document.getElementById('err_code').style.display = 'none';
        const act3 = document.getElementById('act3');
        act3.classList.remove('disabled');
        act3.style.opacity = '1';
        act3.style.pointerEvents = 'auto';
    } else {
        document.getElementById('err_code').style.display = 'block';
    }
};

window.onPinInput = function() {
    const p1 = document.getElementById('pin1').value;
    const p2 = document.getElementById('pin2').value;
    const btn = document.getElementById('btnFinish');
    
    if (p1.length === 6 && p1 === p2 && /^\d+$/.test(p1)) {
        document.getElementById('err_pin').style.display = 'none';
        btn.disabled = false;
        btn.style.opacity = '1';
    } else {
        document.getElementById('err_pin').style.display = 'block';
        btn.disabled = true;
        btn.style.opacity = '0.5';
    }
};

window.finishActivation = function() {
    document.getElementById('screen_vneid_activation').style.display = 'none';
    document.getElementById('screen_vneid_final').style.display = 'block';
    
    document.getElementById('fs_name').textContent = document.getElementById('hoTen').value || 'Khách hàng';
    
    const doiTuongVal = document.querySelector('input[name="doiTuongHD"]:checked').value;
    let typeLabel = "Cá nhân";
    if(doiTuongVal === 'hkd') typeLabel = "Hộ kinh doanh";
    document.getElementById('fs_type').textContent = typeLabel;
    
    document.getElementById('fs_pkg').textContent = document.getElementById('cart_pkg').textContent;
    
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + parseInt(document.getElementById('cart_pkg').textContent.replace(/[^0-9]/g, '')) || 1);
    const dd = String(nextYear.getDate()).padStart(2, '0');
    const mm = String(nextYear.getMonth() + 1).padStart(2, '0');
    document.getElementById('fs_expire').textContent = `${dd}/${mm}/${nextYear.getFullYear()}`;
};

document.addEventListener('DOMContentLoaded', initRegisterPage);
