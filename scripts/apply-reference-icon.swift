// Builds BOTH icon variants from the user's reference artwork:
//  1. assets/icon.png                 — full-bleed classic icon (zoom 1.16)
//  2. assets/adaptive-icon-foreground.png — full-bleed art as backdrop + the
//     artwork at 62% centered (content inside the adaptive-icon safe zone, so
//     launcher circle masks never crop the pin or domes).
import AppKit

let sourcePath = "/Users/pranitha/Downloads/Wanderlust Mountains Travel Icon.png"
guard let source = NSImage(contentsOfFile: sourcePath) else {
    print("FAIL: could not load source"); exit(1)
}
let sw = source.size.width, sh = source.size.height
let tiff = source.tiffRepresentation!
let rep = NSBitmapImageRep(data: tiff)!

func isCream(_ c: NSColor) -> Bool {
    let r = c.redComponent, g = c.greenComponent, b = c.blueComponent
    return (r > 0.88 && g > 0.86 && b > 0.80 && (r - b) < 0.12 && (g - b) < 0.10)
        || (r > 0.96 && g > 0.96 && b > 0.96) // treat pure white as paper too
}

var minX = sw, minY = sh, maxX: CGFloat = 0, maxY: CGFloat = 0
for y in stride(from: 0, to: Int(sh), by: 4) {
    for x in stride(from: 0, to: Int(sw), by: 4) {
        guard let c = rep.colorAt(x: x, y: y)?.usingColorSpace(.deviceRGB) else { continue }
        if !isCream(c) {
            let fx = CGFloat(x), fy = CGFloat(y)
            minX = min(minX, fx); maxX = max(maxX, fx)
            minY = min(minY, fy); maxY = max(maxY, fy)
        }
    }
}
minX = max(0, minX - 8); minY = max(0, minY - 8)
maxX = min(sw, maxX + 8); maxY = min(sh, maxY + 8)
let artW = maxX - minX, artH = maxY - minY
print("art bbox: \(artW)x\(artH)")

let S: CGFloat = 1024
let cropImage = NSImage(size: NSSize(width: artW, height: artH))
cropImage.lockFocus()
source.draw(in: NSRect(x: -minX, y: maxY - sh, width: sw, height: sh))
cropImage.unlockFocus()

func drawArt(in img: NSImage, zoom: CGFloat) {
    img.lockFocus()
    let drawW = S * zoom
    let drawH = drawW * (artH / artW)
    cropImage.draw(in: NSRect(x: (S - drawW) / 2, y: (S - drawH) / 2, width: drawW, height: drawH))
    img.unlockFocus()
}

// 1. Classic icon: full-bleed.
let classic = NSImage(size: NSSize(width: S, height: S))
drawArt(in: classic, zoom: 1.16)
let out1 = "/Users/pranitha/Documents/AppDev/assets/icon.png"
try! NSBitmapImageRep(data: classic.tiffRepresentation!)!
    .representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out1))
print("wrote \(out1)")

// 2. Adaptive foreground: zoomed backdrop + 62% centered artwork.
let adaptive = NSImage(size: NSSize(width: S, height: S))
adaptive.lockFocus()
let bgW = S * 1.16
let bgH = bgW * (artH / artW)
cropImage.draw(in: NSRect(x: (S - bgW) / 2, y: (S - bgH) / 2, width: bgW, height: bgH))
adaptive.unlockFocus()
// draw bg first, then paste the small centered art on top
adaptive.lockFocus()
let fgScale: CGFloat = 0.62
let fgW = S * fgScale
let fgH = fgW * (artH / artW)
cropImage.draw(in: NSRect(x: (S - fgW) / 2, y: (S - fgH) / 2, width: fgW, height: fgH))
adaptive.unlockFocus()
let out2 = "/Users/pranitha/Documents/AppDev/assets/adaptive-icon-foreground.png"
try! NSBitmapImageRep(data: adaptive.tiffRepresentation!)!
    .representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out2))
print("wrote \(out2)")
