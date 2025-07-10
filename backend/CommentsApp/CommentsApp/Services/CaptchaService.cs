using SkiaSharp;
using System.Collections.Concurrent;

public class CaptchaService
{
    private static readonly ConcurrentDictionary<string, string> Captchas = new();

    public (byte[] image, string captchaId) GenerateCaptcha()
    {
        string code = GenerateCode(5);
        string id = Guid.NewGuid().ToString();

        Captchas[id] = code;

        var imageBytes = GenerateImage(code);
        return (imageBytes, id);
    }

    public bool ValidateCaptcha(string id, string userInput)
    {
        if (Captchas.TryRemove(id, out var realCode))
        {
            return string.Equals(userInput, realCode, StringComparison.OrdinalIgnoreCase);
        }
        return false;
    }

    private string GenerateCode(int length)
    {
        const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        var random = new Random();
        return new string(Enumerable.Range(0, length)
            .Select(_ => chars[random.Next(chars.Length)]).ToArray());
    }

    private byte[] GenerateImage(string code)
    {
        int width = 150;
        int height = 50;

        using var bitmap = new SKBitmap(width, height);
        using var canvas = new SKCanvas(bitmap);
        canvas.Clear(SKColors.White);

        using var paint = new SKPaint
        {
            Color = SKColors.Black,
            IsAntialias = true,
            TextSize = 32,
            Typeface = SKTypeface.Default
        };

        canvas.DrawText(code, 20, 35, paint);

        using var image = SKImage.FromBitmap(bitmap);
        using var data = image.Encode(SKEncodedImageFormat.Png, 100);
        return data.ToArray();
    }
}
