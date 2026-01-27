(function() {
    // Chỉ khai báo biến, chưa đụng vào DOM ngay
    var canvas, ctx, width, height;
    var particles = [];

    // Cấu hình số lượng và loại hoa
    var maxParticles = 50; 
    var colors = ['#FFC0CB', '#FF69B4', '#FF1493', '#FFD700', '#FFA500']; 

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height - height,
            vx: Math.random() * 2 - 1, 
            vy: Math.random() * 2 + 1, 
            size: Math.random() * 5 + 3, 
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.05 - 0.025
        };
    }

    function resize() {
        if(canvas) {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
    }

    function init() {
        // DI CHUYỂN VIỆC TẠO CANVAS VÀO ĐÂY
        // Lúc này body chắc chắn đã tồn tại
        canvas = document.createElement('canvas');
        canvas.id = 'tet-effect';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none'; 
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas); // Lệnh gây lỗi cũ giờ đã an toàn

        ctx = canvas.getContext('2d');
        
        resize();
        for (var i = 0; i < maxParticles; i++) {
            particles.push(createParticle());
        }
        window.addEventListener('resize', resize);
        animate();
    }

    function drawLeaf(x, y, size, rotation, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
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

            if (p.y > height) {
                p.y = -10;
                p.x = Math.random() * width;
            }
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;

            drawLeaf(p.x, p.y, p.size, p.rotation, p.color);
        }

        requestAnimationFrame(animate);
    }

    // Chờ tải trang xong mới chạy hàm init
    window.onload = init;
})();