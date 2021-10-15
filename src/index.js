export default class PixiUtils {
    constructor(renderingEngine = PIXI) {
        this.render = "";
        this.renderingEngine = renderingEngine;

        this.fl = 50;
        this.vpX = 0;
        this.vpY = 0;

        if (renderingEngine.ParticleContainer && renderingEngine.Sprite) {
            this.renderer = "pixi";
            this.Container = renderingEngine.Container;
            this.ParticleContainer = renderingEngine.ParticleContainer;
            this.TextureCache = renderingEngine.utils.TextureCache;
            this.Texture = renderingEngine.Texture;
            this.Rectangle = renderingEngine.Rectangle;
            this.AnimatedSprite = renderingEngine.AnimatedSprite;
            //this.MovieClip = renderingEngine.extras.MovieClip;
            //this.BitmapText = renderingEngine.extras.BitmapText;
            this.Sprite = renderingEngine.Sprite;
            //this.TilingSprite = renderingEngine.extras.TilingSprite;
            this.Graphics = renderingEngine.Graphics;
            this.Text = renderingEngine.Text;
            this.TextStyle = renderingEngine.TextStyle;

            //An array to store all the shaking sprites
            this.shakingSprites = [];
        }
    }

    /*
     * 创建带图片的元件
     * @param {string} src	图片地址
     * @param {string} _from	资源来源于哪，'fromImage'和'fromFrame'
     * @param {string || number} _x	图片在Sprite里的位置，可以是'center','left','right',也可以是数字
     * @param {string || number} _y	图片在Sprite里的位置，可以是'center','top','bottom',也可以是数字
     * @param {Boolean} _interactive	是否是可点击的，默认为false
     */
    sprite(__src, _from, _x, _y, _interactive) {
        let mc;
        let anchorX = _x || 0;
        let anchorY = _y || 0;
        let interactive = _interactive || false;

        if (_from == 'fromFrame') {
            let texture = this.Texture.from(__src);
            mc = new this.Sprite(texture);
        } else {
            mc = new this.Sprite.from(__src);
        }

        switch (_x) {
            case 'left':
                anchorX = 0;
                break;
            case 'center':
                anchorX = 0.5;
                break;
            case 'right':
                anchorX = 1;
                break;
        }
        switch (_y) {
            case 'top':
                anchorY = 0;
                break;
            case 'center':
                anchorY = 0.5;
                break;
            case 'bottom':
                anchorY = 1;
                break;
        }

        mc.anchor.set(anchorX, anchorY);
        mc.interactive = interactive;
        return mc;
    }

    /*
     * 创建Graphics矩形
     */
    CdrawRect(__width, __height, __options) {
        const options = {
            lineWeight: __options.lineWeight || 0, //边线的粗细度，默认为0
            lineColor: __options.lineColor || '0xffffff', //边线的颜色
            lineAlpha: __options.lineAlpha || 0, //边线透明度
            fillColor: __options.fillColor || '0xffffff', //填充颜色
            fillAlpha: __options.fillAlpha || 1, //填充透明度
            interactive: __options.interacitve || false //是否可点击
        }

        let mc = new this.Graphics();
        mc.lineStyle(options.lineWeight, options.lineColor, options.lineAlpha);
        if (options.fillColor != 'none') {
            mc.beginFill(options.fillColor, __options.fillAlpha);
        }
        mc.drawRect(0, 0, __width, __height);
        mc.interactive = options.interactive;

        return mc;
    }

    /*
     * 创建Graphics圆形
     */
    CdrawCircle(__radius, __options) {
        const options = {
            lineWeight: __options.lineWeight || 0, //边线的粗细度，默认为0
            lineColor: __options.lineColor || '0xffffff', //边线的颜色
            lineAlpha: __options.lineAlpha || 0, //边线透明度
            fillColor: __options.fillColor || '0xffffff', //填充颜色
            fillAlpha: __options.fillAlpha || 1, //填充透明度
            interactive: __options.interacitve || false //是否可点击
        }

        let mc = new this.Graphics();
        mc.lineStyle(options.lineWeight, options.lineColor, options.lineAlpha);
        mc.beginFill(options.fillColor, options.fillAlpha);
        mc.drawCircle(0, 0, __radius);
        mc.interactive = options.interactive;

        return mc;
    }

    /*
     * 创建普通按钮
     */
    CBtnText(__txt, __width, __height, __options) {
        const options = {
            lineWeight: __options.lineWeight || 0, //边线的粗细度，默认为0
            lineColor: __options.lineColor || '0xffffff', //边线的颜色
            lineAlpha: __options.lineAlpha || 0, //边线透明度
            fillColor: __options.fillColor || '0xffffff', //填充颜色
            fillAlpha: __options.fillAlpha || 1, //填充透明度
            fontSize: __options.fontSize || 24, //字号
            fontColor: __options.fontColor || '0x000000', //字体颜色
            align: __options.align || 'left', //对齐方式
        }

        let mc = new this.Graphics();
        mc.lineStyle(options.lineWeight, options.lineColor, options.lineAlpha);
        mc.beginFill(options.fillColor, options.fillAlpha);
        mc.drawRect(0, 0, __width, __height);
        mc.interactive = true;

        const fontStyle = new this.TextStyle({
            fontSize: options.fontSize,
            fill: options.fontColor, // gradient
            align: options.align
        });

        let txt = new this.Text(__txt, fontStyle);
        mc.addChild(txt);
        txt.x = mc.width / 2 - txt.width / 2;
        txt.y = mc.height / 2 - txt.height / 2;

        return mc;

    }

    /*
     * 创建普通圆形按钮
     */
    CBtnCircleText(__txt, __radius, __options) {
        const options = {
            lineWeight: __options.lineWeight || 0, //边线的粗细度，默认为0
            lineColor: __options.lineColor || '0xffffff', //边线的颜色
            lineAlpha: __options.lineAlpha || 0, //边线透明度
            fillColor: __options.fillColor || '0xffffff', //填充颜色
            fillAlpha: __options.fillAlpha || 1, //填充透明度
            fontSize: __options.fontSize || 24, //字号
            fontColor: __options.fontColor || '0x000000', //字体颜色
            align: __options.align || 'left', //对齐方式
        }

        let mc = new this.Graphics();
        mc.lineStyle(options.lineWeight, options.lineColor, options.lineAlpha);
        mc.beginFill(options.fillColor, options.fillAlpha);
        mc.drawCircle(0, 0, __radius);
        mc.interactive = true;

        const fontStyle = new this.Text({
            fontSize: options.fontSize,
            fill: options.fontColor, // gradient
            align: options.align
        });

        let txt = new this.Text(__txt, fontStyle);
        mc.addChild(txt);
        txt.x = -txt.width / 2;
        txt.y = -txt.height / 2;

        return mc;

    }


    /*
     * 设置序列帧
     * name：序列帧图片文件名
     * ext：序列帧图片扩展名，如果没有就为''
     * sNum：序列图的编号从几开始
     * tol：序列图最后一张的编号
     * speed：播放速度
     * onComplete：播放结束后的回调
     * loop：是否循环播放
     */
    setVideo(name, ext, sNum, tol, speed, onComplete, loop) {
        let VTextures = [],
            _mc;
        loop == undefined ? loop = false : loop;
        speed == undefined ? speed = .5 : speed;

        for (let i = sNum; i <= tol; i++) {
            let texture = new this.Texture.from(name + i + ext);
            VTextures.push(texture);
        }
        _mc = new this.AnimatedSprite(VTextures);
        _mc.animationSpeed = speed;
        _mc.loop = loop;
        if (onComplete != undefined) {
            _mc.onComplete = onComplete;
        }
        return _mc;
    }

    /*
     * 跳到序列帧的某一帧
     * vmc：序列帧对象
     * videotolN：总共的帧数，从0开始
     * nowN：当前要跳到哪一帧
     * loop：是否循环
     */
    VideoStop(vmc, videotolN, nowN, loop) {
        if (loop) {
            vmc.gotoAndStop(Math.floor(nowN % 14));
        } else {
            if (nowN >= videotolN) {
                vmc.gotoAndStop(videotolN);
            } else if (nowN < 0) {
                vmc.gotoAndStop(0);
            } else {
                vmc.gotoAndStop(nowN);
            }
        }
    }

    //三维参数
    /*
     * xpos：mc的x轴的偏移量，用来设置mc的x轴位置
     * ypos：mc的y轴的偏移量，用来设置mc的y轴位置
     * zpos：mc的z轴的偏移量，用来设置mc的z轴位置，值越大离镜头越远
     * mc的x轴和y轴的坐标会跟scale成正比，可用xpos和ypos结合scale计算mc的真实坐标
     * scale与zpos成反比，zpos越值越大，scale越小
     */
    onPerspective(_mc) {
        let scale = this.fl / (this.fl + _mc.zpos);
        _mc.scale.x = _mc.scale.y = scale;
        _mc.x = this.vpX + _mc.xpos * scale;
        _mc.y = this.vpY + _mc.ypos * scale;
    }

    //设置Mc容器
    setSpriteMc(parentmc, mcx, mcy) {
        let mc = new this.Sprite;
        mc.position.set(mcx, mcy);
        mc.scale.set(1);
        parentmc.addChild(mc);
        return mc;
    }

    //画虚线框
    dashLineRect(__lineLength, __lineDistance, __totalWidth, __totalHeight, option) {
        let graphics;
        //如果有目标graphic，就对此graphic进行操作，不新建新的graphic了
        if (option && option.targetGraph) {
            graphics = option.targetGraph;
            graphics.clear();
        } else {
            graphics = new this.Graphics;
        }

        let __lineWeight = option ? option.lineWeight || 1 : 1; //线粗
        let __lineColor = option ? option.lineColor || '0xffffff' : '0xffffff'; //线的颜色
        let __lineAlpha = option ? option.lineAlpha || 1 : 1; //线的透明度

        graphics.lineStyle(__lineWeight, __lineColor, __lineAlpha);
        let lineLength = __lineLength; //线的长度为5
        let lineDistance = lineLength + __lineDistance; //两条线之间间隔是3
        let totalWidth = __totalWidth; //总长度为200
        let totalHeight = __totalHeight; // 总高度为200

        let wLineNum = Math.floor(totalWidth / lineDistance); //长度有几条线
        let hLineNum = Math.floor(totalHeight / lineDistance); //高度有几条线

        for (let i = 0; i < wLineNum; i++) {
            graphics.moveTo(lineDistance * i, 0);
            graphics.lineTo(lineDistance * i + lineLength, 0);
        }

        for (let i = 0; i < wLineNum; i++) {
            graphics.moveTo(lineDistance * i, totalHeight);
            graphics.lineTo(lineDistance * i + lineLength, totalHeight);
        }

        for (let i = 0; i < hLineNum; i++) {
            graphics.moveTo(0, lineDistance * i);
            graphics.lineTo(0, lineDistance * i + lineLength);
        }

        for (let i = 0; i < hLineNum; i++) {
            graphics.moveTo(totalWidth, lineDistance * i);
            graphics.lineTo(totalWidth, lineDistance * i + lineLength);
        }

        //如果有目标graphic，就不返回值了，如果没有，就返回新的graphic
        if (option && option.targetGraph) {} else {
            return graphics;
        }

    }
}