// Roam India app icon — "travel collage" concept:
// sky gradient, sun, blue mountain range, dark-green foreground hill with a
// Taj Mahal silhouette, river, white plane with swoosh trail, and a big
// orange location pin in front.
// All foreground art stays inside a ~330px radius (adaptive-icon safe zone).
import AppKit

let size = NSSize(width: 1024, height: 1024)
let center = NSPoint(x: 512, y: 512)

// Palette
let skyTop = NSColor(srgbRed: 0x18/255.0, green: 0x7C/255.0, blue: 0xE4/255.0, alpha: 1)
let skyBottom = NSColor(srgbRed: 0xA5/255.0, green: 0xD8/255.0, blue: 0xF5/255.0, alpha: 1)
let sunYellow = NSColor(srgbRed: 0xFF/255.0, green: 0xB9/255.0, blue: 0x37/255.0, alpha: 1)
let pinOrange = NSColor(srgbRed: 0xFF/255.0, green: 0x5A/255.0, blue: 0x1F/255.0, alpha: 1)
let mountainMid = NSColor(srgbRed: 0x2B/255.0, green: 0x9B/255.0, blue: 0xE5/255.0, alpha: 1)
let mountainLeft = NSColor(srgbRed: 0x1D/255.0, green: 0x6F/255.0, blue: 0xD0/255.0, alpha: 1)
let mountainRight = NSColor(srgbRed: 0x15/255.0, green: 0x60/255.0, blue: 0xAE/255.0, alpha: 1)
let hillGreen = NSColor(srgbRed: 0x1E/255.0, green: 0x6E/255.0, blue: 0x4F/255.0, alpha: 1)
let tajDark = NSColor(srgbRed: 0x0D/255.0, green: 0x2F/255.0, blue: 0x29/255.0, alpha: 1)
let riverBlue = NSColor(srgbRed: 0x7F/255.0, green: 0xD0/255.0, blue: 0xF4/255.0, alpha: 1)
let white = NSColor.white
let skyPale = NSColor(srgbRed: 0x8E/255.0, green: 0xD4/255.0, blue: 0xF2/255.0, alpha: 1)

let ctxSize: NSSize = size

func gradientBackground() {
    let bg = NSBezierPath(rect: NSRect(origin: .zero, size: ctxSize))
    let grad = NSGradient(starting: skyTop, ending: skyBottom)
    grad?.draw(in: bg, angle: 270) // deep blue at the top, pale near the horizon
}

func circleAt(_ cx: CGFloat, _ cy: CGFloat, _ r: CGFloat, _ color: NSColor) {
    color.setFill()
    NSBezierPath(ovalIn: NSRect(x: cx - r, y: cy - r, width: 2*r, height: 2*r)).fill()
}

let img = NSImage(size: size)
img.lockFocus()

let ctx = NSGraphicsContext.current!
// Sky fills the whole canvas first (untransformed).
gradientBackground()

ctx.saveGraphicsState()
let t = NSAffineTransform()
t.translateX(by: center.x, yBy: center.y)
t.concat()

// 2. Sun (behind mountains)
circleAt(165, 55, 95, sunYellow)

// 3. White orbit swoosh crossing behind the pin (left sweep + right tail)
let orbit = NSBezierPath()
orbit.move(to: NSPoint(x: -262, y: -46))
orbit.curve(to: NSPoint(x: -48, y: 158),
            controlPoint1: NSPoint(x: -302, y: 132),
            controlPoint2: NSPoint(x: -168, y: 208))
white.setStroke()
orbit.lineWidth = 15
orbit.lineCapStyle = .round
orbit.stroke()
let tail = NSBezierPath()
tail.move(to: NSPoint(x: 46, y: 2))
tail.curve(to: NSPoint(x: 118, y: 132),
           controlPoint1: NSPoint(x: 92, y: 40),
           controlPoint2: NSPoint(x: 112, y: 92))
tail.lineWidth = 11
tail.stroke()

// 4. Mountain range (three layered peaks)
func peak(_ apex: NSPoint, _ l: NSPoint, _ r: NSPoint, _ c: NSColor) {
    let p = NSBezierPath()
    p.move(to: l); p.line(to: apex); p.line(to: r); p.close()
    c.setFill(); p.fill()
}
peak(NSPoint(x: -150, y: 40), NSPoint(x: -330, y: -105), NSPoint(x: 40, y: -105), mountainLeft)
peak(NSPoint(x: 240, y: -10), NSPoint(x: 110, y: -105), NSPoint(x: 330, y: -105), mountainRight)
peak(NSPoint(x: 30, y: 90), NSPoint(x: -160, y: -105), NSPoint(x: 235, y: -105), mountainMid)

// 5. Foreground: green hill with river
let hill = NSBezierPath()
hill.move(to: NSPoint(x: -330, y: -140))
hill.curve(to: NSPoint(x: -40, y: -92), controlPoint1: NSPoint(x: -218, y: -140), controlPoint2: NSPoint(x: -140, y: -80))
hill.curve(to: NSPoint(x: 320, y: -128), controlPoint1: NSPoint(x: 46, y: -132), controlPoint2: NSPoint(x: 190, y: -140))
hill.line(to: NSPoint(x: 330, y: -330))
hill.line(to: NSPoint(x: -330, y: -330))
hill.close()
hillGreen.setFill()
hill.fill()

// 6. River over the right foreground
let river = NSBezierPath()
river.move(to: NSPoint(x: 30, y: -118))
river.curve(to: NSPoint(x: 330, y: -168), controlPoint1: NSPoint(x: 140, y: -118), controlPoint2: NSPoint(x: 230, y: -122))
river.line(to: NSPoint(x: 330, y: -330))
river.line(to: NSPoint(x: -20, y: -330))
river.curve(to: NSPoint(x: 30, y: -118), controlPoint1: NSPoint(x: -6, y: -270), controlPoint2: NSPoint(x: 4, y: -190))
river.close()
riverBlue.setFill()
river.fill()
// water stripes
let stripeColor = NSColor.white.withAlphaComponent(0.55)
for (x, y, w) in [(120.0, -200.0, 130.0), (150.0, -250.0, 150.0), (110.0, -295.0, 120.0)] as [(CGFloat, CGFloat, CGFloat)] {
    stripeColor.setFill()
    NSBezierPath(roundedRect: NSRect(x: x, y: y, width: w, height: 14), xRadius: 7, yRadius: 7).fill()
}

// 7. Taj silhouette on the left hilltop
tajDark.setFill()
NSBezierPath(rect: NSRect(x: -240, y: -118, width: 170, height: 42)).fill()
// central dome + spike
circleAt(-155, -80, 40, tajDark)
tajDark.setFill()
let spike = NSBezierPath()
spike.move(to: NSPoint(x: -172, y: -46))
spike.line(to: NSPoint(x: -138, y: -46))
spike.line(to: NSPoint(x: -155, y: -6))
spike.close()
spike.fill()
// side domes
for sx in [-1.0, 1.0] as [CGFloat] {
    let cx = -155 + 64 * sx
    circleAt(cx, -84, 26, tajDark)
    tajDark.setFill()
    let s = NSBezierPath()
    s.move(to: NSPoint(x: cx - 12, y: -64))
    s.line(to: NSPoint(x: cx + 12, y: -64))
    s.line(to: NSPoint(x: cx, y: -40))
    s.close()
    s.fill()
}
// door arch cut into platform
skyPale.setFill()
let door = NSBezierPath()
door.move(to: NSPoint(x: -168, y: -118))
door.line(to: NSPoint(x: -168, y: -98))
door.appendArc(withCenter: NSPoint(x: -155, y: -98), radius: 13, startAngle: 180, endAngle: 0, clockwise: false)
door.line(to: NSPoint(x: -142, y: -118))
door.close()
door.fill()

// 8. White airplane (SF Symbol) top-right, tilted climbing
let baseURL = "airplane"
if let plane = NSImage(systemSymbolName: "airplane", accessibilityDescription: nil)?
        .withSymbolConfiguration(.init(pointSize: 124, weight: .bold)) {
    // Template symbols draw as black; recolor to white via sourceAtop compositing.
    let tinted = NSImage(size: plane.size)
    tinted.lockFocus()
    plane.draw(in: NSRect(origin: .zero, size: plane.size))
    white.set()
    NSRect(origin: .zero, size: plane.size).fill(using: .sourceAtop)
    tinted.unlockFocus()

    let w: CGFloat = 150
    let h = w * (tinted.size.height / tinted.size.width)
    let px: CGFloat = -w / 2
    let py: CGFloat = -h / 2 - 8
    ctx.saveGraphicsState()
    let rot = NSAffineTransform()
    rot.translateX(by: 130, yBy: 195)
    rot.rotate(byDegrees: 24)
    rot.concat()
    tinted.draw(in: NSRect(x: px, y: py, width: w, height: h))
    ctx.restoreGraphicsState()
}

// 9. Location pin (front and center)
let pin = NSBezierPath()
pin.move(to: NSPoint(x: -74, y: 96))
pin.line(to: NSPoint(x: 74, y: 96))
pin.line(to: NSPoint(x: 0, y: -86))
pin.close()
pinOrange.setFill()
pin.fill()
circleAt(0, 130, 104, pinOrange)
circleAt(0, 130, 46, skyPale)

ctx.restoreGraphicsState()
img.unlockFocus()

let pngData = NSBitmapImageRep(data: img.tiffRepresentation!)!.representation(using: .png, properties: [:])!
try! pngData.write(to: URL(fileURLWithPath: "/tmp/logo-travel.png"))
print("wrote /tmp/logo-travel.png")
