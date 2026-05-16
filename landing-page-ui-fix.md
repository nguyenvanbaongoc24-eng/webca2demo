# 🎨 UI Fix – Landing Page & Images
## webca2demo-next.vercel.app | Fix hình ảnh + CTA + Typography

---

## ❌ VẤN ĐỀ 1 – Toàn bộ hình ảnh không load (Nghiêm trọng nhất)

### Hiện trạng:
- Hero cards (5 card dưới hero) → đen hoàn toàn
- Section "Remote Signing" → ảnh bên phải không hiện (chỉ có alt text)
- Section "Sign Platform" → ảnh bên trái không hiện
- Scroll xuống → không thấy ảnh sản phẩm nào

### Nguyên nhân:
- Đường dẫn ảnh local không tồn tại khi deploy lên Vercel
- Hoặc dùng relative path sai (`/images/...` không có trong build)

### Fix – Dùng Unsplash CDN (nhanh nhất):

```javascript
// Image URLs - dùng Unsplash miễn phí
const IMAGE_URLS = {
  // Hero cards
  hero_cards: [
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',  // Security
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',  // Business
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',  // Analytics
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',  // Digital
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'   // Tech
  ],

  // Product sections
  remote_signing: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  sign_platform:  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  usb_token:      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
  ekyc:           'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&h=600&fit=crop'
};
```

### HTML với fallback:

```jsx
// Hero cards
<div className="hero-cards-grid">
  {IMAGE_URLS.hero_cards.map((url, i) => (
    <div key={i} className="hero-card" style={{
      backgroundImage: `linear-gradient(rgba(0,48,135,0.8), rgba(0,48,135,0.6)), url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="card-icon">{icons[i]}</div>
      <div className="card-title">{titles[i]}</div>
    </div>
  ))}
</div>

// Product section image
<div className="product-image-container">
  <img
    src={IMAGE_URLS.remote_signing}
    alt="CA2 Remote Signing"
    onError={(e) => {
      // Fallback nếu URL die
      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e8eef8" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%23003087"%3E📱%3C/text%3E%3C/svg%3E';
    }}
  />
</div>
```

### CSS Hero Cards:

```css
.hero-cards-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 40px;
}
.hero-card {
  aspect-ratio: 4/3;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}
.hero-card:hover { transform: translateY(-4px); }
.hero-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%);
}
.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .hero-cards-grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## ❌ VẤN ĐỀ 2 – Nút CTA chưa nổi bật

### Hiện trạng:
- Nút "Đăng ký ngay" màu đỏ flat `#e73943`
- Không gradient, không hiệu ứng
- Text "Đăng ký ngay" → cần đổi thành **"Đăng ký online"**

### Fix – Gradient nổi bật + Animation:

```jsx
<button className="cta-button-primary">
  🛒 Đăng ký online
</button>

<style jsx>{`
.cta-button-primary {
  /* Gradient đỏ → cam nổi bật */
  background: linear-gradient(135deg, #d62b2b 0%, #f5a623 100%);
  
  /* Shadow mạnh */
  box-shadow: 
    0 4px 14px rgba(214, 43, 43, 0.4),
    0 2px 8px rgba(214, 43, 43, 0.2);
  
  /* Typography */
  color: white;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  
  /* Spacing */
  padding: 14px 32px;
  border-radius: 30px;  /* pill shape */
  border: none;
  
  /* Interaction */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Icon spacing */
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cta-button-primary:hover {
  /* Gradient đậm hơn khi hover */
  background: linear-gradient(135deg, #b02020 0%, #e89520 100%);
  
  /* Shadow mạnh hơn */
  box-shadow: 
    0 6px 20px rgba(214, 43, 43, 0.5),
    0 3px 12px rgba(214, 43, 43, 0.3);
  
  /* Nhấc lên */
  transform: translateY(-2px);
}

.cta-button-primary:active {
  transform: translateY(0);
  box-shadow: 
    0 2px 8px rgba(214, 43, 43, 0.3);
}

/* Pulse animation (optional) */
@keyframes pulse {
  0%, 100% { box-shadow: 0 4px 14px rgba(214, 43, 43, 0.4); }
  50%      { box-shadow: 0 4px 20px rgba(214, 43, 43, 0.6); }
}
.cta-button-primary {
  animation: pulse 2s ease-in-out infinite;
}
`}</style>
```

### Nút phụ (trắng outline):

```jsx
<button className="cta-button-secondary">
  Khám phá nền tảng
</button>

<style jsx>{`
.cta-button-secondary {
  background: white;
  color: #003087;
  border: 2px solid white;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
}
.cta-button-secondary:hover {
  background: transparent;
  color: white;
  border-color: white;
  box-shadow: 0 4px 16px rgba(255,255,255,0.2);
}
`}</style>
```

---

## ❌ VẤN ĐỀ 3 – Typography Hero chưa nổi bật

### Hiện trạng:
- Tiêu đề "Nền tảng chuyển đổi số toàn diện cho doanh nghiệp Việt" → font weight bình thường
- Màu trắng thuần không có contrast tốt trên nền navy gradient

### Fix – Font nổi bật hơn:

```css
.hero-title {
  /* Font size lớn hơn */
  font-size: 56px;
  line-height: 1.15;
  
  /* Weight nặng hơn */
  font-weight: 800;  /* extra bold */
  
  /* Text shadow nhẹ tăng độ nét */
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  
  /* Màu trắng tinh khiết */
  color: #ffffff;
  
  /* Letter spacing */
  letter-spacing: -0.5px;
  
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 1.6;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  max-width: 580px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .hero-title { font-size: 36px; }
  .hero-subtitle { font-size: 16px; }
}
```

### Thêm gradient text (optional – sang hơn):

```css
.hero-title {
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Fallback cho browser cũ */
  color: white;
}
```

---

## ❌ VẤN ĐỀ 4 – Product sections thiếu hình ảnh

### Hiện trạng:
- Section "CA2 Remote Signing toàn Sign platform" → ảnh bên phải trống
- Section "Sign Platform" dưới → ảnh bên trái trống

### Fix – Component ProductSection:

```jsx
function ProductSection({ 
  title, 
  description, 
  imageUrl, 
  imagePosition = 'right',  // 'left' or 'right'
  ctaText = 'Tìm hiểu thêm',
  ctaLink = '#'
}) {
  const isImageRight = imagePosition === 'right';
  
  return (
    <section className="product-section">
      <div className="product-container">
        
        {/* Text content */}
        <div className={`product-content ${isImageRight ? 'order-1' : 'order-2'}`}>
          <h2 className="product-title">{title}</h2>
          <p className="product-description">{description}</p>
          <a href={ctaLink} className="product-cta">
            {ctaText} →
          </a>
        </div>

        {/* Image */}
        <div className={`product-image-wrap ${isImageRight ? 'order-2' : 'order-1'}`}>
          <div className="product-image-inner">
            <img
              src={imageUrl}
              alt={title}
              onError={(e) => {
                // SVG fallback với icon tương ứng
                const icon = title.includes('Remote') ? '📱' : 
                            title.includes('Platform') ? '🏗️' : '🔐';
                e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e8eef8" width="800" height="600" rx="12"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="120"%3E${icon}%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

// Usage:
<ProductSection
  title="CA2 Remote Signing toàn Sign platform"
  description="Tăng tốc số hóa, bảo mật hàng đầu và tối ưu hiệu quả kinh doanh cùng giải pháp chữ ký số và an ninh mạng từ Nacencomm."
  imageUrl={IMAGE_URLS.remote_signing}
  imagePosition="right"
  ctaText="Tìm hiểu thêm"
  ctaLink="/products/remote-signing"
/>

<ProductSection
  title="CA2 Sign Platform"
  description="Nền tảng ký số tập trung cho doanh nghiệp lớn và tổ chức, quản lý tập trung hàng nghìn chứng thư số."
  imageUrl={IMAGE_URLS.sign_platform}
  imagePosition="left"
  ctaText="Xem demo"
  ctaLink="/products/ca2-platform"
/>
```

### CSS ProductSection:

```css
.product-section {
  padding: 80px 20px;
  background: white;
}
.product-section:nth-child(even) {
  background: #f8faff;
}
.product-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.product-content {
  padding: 20px;
}
.product-title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1c23;
  margin-bottom: 16px;
  line-height: 1.25;
}
.product-description {
  font-size: 16px;
  line-height: 1.7;
  color: #4a4f5e;
  margin-bottom: 24px;
}
.product-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #003087;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}
.product-cta:hover {
  background: #001f5c;
  gap: 12px;  /* arrow moves */
}

.product-image-wrap {
  position: relative;
}
.product-image-inner {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 48, 135, 0.12);
}
.product-image-inner img {
  width: 100%;
  height: auto;
  display: block;
}

/* Order control */
.order-1 { order: 1; }
.order-2 { order: 2; }

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .order-1, .order-2 { order: unset; }
  .product-title { font-size: 28px; }
}
```

---

## 🎨 Bonus – Hero với particles background (optional)

Thêm animation particles nhẹ cho hero section sang hơn:

```jsx
// particles-bg.jsx
import { useEffect, useRef } from 'react';

export function ParticlesBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 600;
    
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1
    }));
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    animate();
  }, []);
  
  return <canvas ref={canvasRef} className="particles-bg" />;
}

// CSS
.particles-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  opacity: 0.4;
}
```

---

## ✅ Checklist áp dụng fix

```
Hình ảnh:
  □ Thay tất cả image paths bằng Unsplash CDN URLs
  □ Thêm onError fallback cho mọi <img>
  □ Render hero cards với background-image
  □ Test tất cả ảnh load trên Vercel production

CTA Button:
  □ Đổi text "Đăng ký ngay" → "Đăng ký online"
  □ Apply gradient đỏ→cam với shadow
  □ Thêm hover animation (translateY + shadow)
  □ Thêm pulse animation (optional)

Typography:
  □ Hero title: font-weight 800, font-size 56px
  □ Thêm text-shadow nhẹ
  □ Hero subtitle: opacity 0.85
  □ Mobile: giảm font-size xuống 36px

Product sections:
  □ Build ProductSection component
  □ Render 2–4 sections với alternating image position
  □ Thêm onError fallback SVG cho product images
  □ Test responsive mobile (stack vertical)
```

---

## 📊 So sánh Before/After

| Element | Before | After |
|---|---|---|
| Hero CTA | Đỏ flat, "Đăng ký ngay" | Gradient đỏ→cam, "Đăng ký online", pulse |
| Hero title | 48px, weight 700 | 56px, weight 800, text-shadow |
| Hero cards | Đen (không load) | Background images với overlay |
| Product images | Alt text (không load) | Unsplash CDN + SVG fallback |
| Product sections | Ảnh trống | Full layout 2-column với CTA |

---

## 🚀 Deploy nhanh

```bash
# 1. Update image URLs
# 2. Update CTA component
# 3. Update hero typography CSS
# 4. git push → Vercel auto deploy
# 5. Test trên production URL
```

File này fix đủ 4 vấn đề lớn. Priority: **Hình ảnh → CTA → Typography → Sections**.
