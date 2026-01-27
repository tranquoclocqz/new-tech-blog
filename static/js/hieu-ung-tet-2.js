(function() {
    // 1. Chỉ khai báo biến, KHÔNG truy cập DOM ngay ở đây
    var canvas, ctx, width, height;
    var particles = [];

    // --- CẤU HÌNH ---
    var maxParticles = 50;
    var colors = ['#FFC0CB', '#FF69B4', '#FF1493', '#FFD700', '#FFA500']; 
    // ----------------

    function resize() {
        if (canvas) { // Kiểm tra canvas tồn tại mới resize
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height - height,
            vx: Math.random() * 1.5 - 0.75,
            vy: Math.random() * 1.5 + 1,
            size: Math.random() * 8 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.02 - 0.01
        };
    }

    function drawFlower(x, y, size, rotation, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.fillStyle = color;
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
            ctx.rotate((Math.PI * 2) / 5);
            ctx.ellipse(0, size / 2, size / 3, size, 0, 0, Math.PI * 2);
        }
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = '#FFFFE0';
        ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.x += Math.sin(p.y * 0.01) * 0.5;

            if (p.y > height) {
                p.y = -20;
                p.x = Math.random() * width;
            }
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;

            drawFlower(p.x, p.y, p.size, p.rotation, p.color);
        }

        requestAnimationFrame(animate);
    }

    // 2. Hàm init: Nơi an toàn để tạo DOM
    function init() {
        // Tạo canvas ở đây vì lúc này body chắc chắn đã tồn tại
        canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        document.body.appendChild(canvas); // Dòng này giờ đã an toàn

        ctx = canvas.getContext('2d');

        resize();
        for (var i = 0; i < maxParticles; i++) {
            particles.push(createParticle());
        }
        window.addEventListener('resize', resize);
        animate();
    }

    // 3. Cơ chế chờ tải trang (giữ nguyên)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }
})();