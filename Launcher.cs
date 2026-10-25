using System;
using System.IO;
using System.Net;
using System.Threading;
using System.Diagnostics;
using System.Windows.Forms;
using System.Drawing;

namespace ElectroLearn3D
{
    public class Program
    {
        private static HttpListener _listener;
        private static Thread _serverThread;
        private static bool _isRunning = true;
        private static int _port = 5173;
        private static string _distPath = "";

        [STAThread]
        public static void Main(string[] args)
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            string exeDir = AppDomain.CurrentDomain.BaseDirectory;
            _distPath = Path.Combine(exeDir, "dist");

            // If dist doesn't exist, try building it
            if (!Directory.Exists(_distPath) || !File.Exists(Path.Combine(_distPath, "index.html")))
            {
                DialogResult buildResult = MessageBox.Show(
                    "Production build folder ('dist') was not found. Would you like to build it now using npm?",
                    "ElectroLearn 3D - Setup",
                    MessageBoxButtons.YesNo,
                    MessageBoxIcon.Question
                );

                if (buildResult == DialogResult.Yes)
                {
                    try
                    {
                        ProcessStartInfo psi = new ProcessStartInfo("cmd.exe", "/c npm run build")
                        {
                            WorkingDirectory = exeDir,
                            CreateNoWindow = false,
                            UseShellExecute = true
                        };
                        Process p = Process.Start(psi);
                        p.WaitForExit();
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Failed to run build: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        return;
                    }
                }
                else
                {
                    return;
                }
            }

            // Find an available port
            for (int p = 5173; p <= 5220; p++)
            {
                try
                {
                    HttpListener testListener = new HttpListener();
                    testListener.Prefixes.Add("http://127.0.0.1:" + p + "/");
                    testListener.Start();
                    testListener.Stop();
                    _port = p;
                    break;
                }
                catch
                {
                    // port in use, try next
                }
            }

            // Start HTTP server in background thread
            try
            {
                _listener = new HttpListener();
                _listener.Prefixes.Add("http://127.0.0.1:" + _port + "/");
                _listener.Start();

                _serverThread = new Thread(ServerLoop);
                _serverThread.IsBackground = true;
                _serverThread.Start();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to start local web server: " + ex.Message, "ElectroLearn 3D", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            string appUrl = "http://127.0.0.1:" + _port + "/";

            // Open browser
            try
            {
                Process.Start(new ProcessStartInfo(appUrl) { UseShellExecute = true });
            }
            catch {}

            // Run Controller Form
            Application.Run(new MainForm(appUrl));

            // Clean shutdown
            _isRunning = false;
            try
            {
                _listener.Stop();
                _listener.Close();
            }
            catch {}
        }

        private static void ServerLoop()
        {
            while (_isRunning && _listener.IsListening)
            {
                try
                {
                    HttpListenerContext context = _listener.GetContext();
                    ThreadPool.QueueUserWorkItem(new WaitCallback(HandleContextCallback), context);
                }
                catch
                {
                    if (!_isRunning) break;
                }
            }
        }

        private static void HandleContextCallback(object state)
        {
            HttpListenerContext context = state as HttpListenerContext;
            if (context != null)
            {
                HandleRequest(context);
            }
        }

        private static void HandleRequest(HttpListenerContext context)
        {
            try
            {
                string rawUrl = context.Request.Url.AbsolutePath.TrimStart('/');
                if (string.IsNullOrEmpty(rawUrl))
                {
                    rawUrl = "index.html";
                }

                string localPath = Path.Combine(_distPath, rawUrl.Replace('/', Path.DirectorySeparatorChar));

                // SPA Fallback: if file doesn't exist, serve index.html
                if (!File.Exists(localPath))
                {
                    localPath = Path.Combine(_distPath, "index.html");
                }

                if (File.Exists(localPath))
                {
                    byte[] bytes = File.ReadAllBytes(localPath);
                    string ext = Path.GetExtension(localPath).ToLower();
                    context.Response.ContentType = GetContentType(ext);
                    context.Response.ContentLength64 = bytes.Length;
                    context.Response.StatusCode = 200;
                    context.Response.Headers.Add("Cache-Control", "no-cache");
                    context.Response.OutputStream.Write(bytes, 0, bytes.Length);
                }
                else
                {
                    context.Response.StatusCode = 404;
                }
            }
            catch {}
            finally
            {
                try
                {
                    context.Response.OutputStream.Close();
                }
                catch {}
            }
        }

        private static string GetContentType(string ext)
        {
            switch (ext)
            {
                case ".html": return "text/html; charset=utf-8";
                case ".js": return "application/javascript; charset=utf-8";
                case ".css": return "text/css; charset=utf-8";
                case ".svg": return "image/svg+xml";
                case ".json": return "application/json; charset=utf-8";
                case ".png": return "image/png";
                case ".jpg":
                case ".jpeg": return "image/jpeg";
                case ".gif": return "image/gif";
                case ".ico": return "image/x-icon";
                case ".woff": return "font/woff";
                case ".woff2": return "font/woff2";
                case ".ttf": return "font/ttf";
                default: return "application/octet-stream";
            }
        }
    }

    public class MainForm : Form
    {
        private string _url;

        public MainForm(string url)
        {
            _url = url;

            this.Text = "ElectroLearn 3D — BEEE Platform";
            this.Size = new Size(460, 260);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.BackColor = Color.FromArgb(251, 249, 244); // Warm light background!

            Label titleLabel = new Label();
            titleLabel.Text = "⚡ ElectroLearn 3D is Running";
            titleLabel.Font = new Font("Segoe UI", 13, FontStyle.Bold);
            titleLabel.ForeColor = Color.FromArgb(180, 83, 9); // Amber/copper
            titleLabel.Location = new Point(25, 20);
            titleLabel.AutoSize = true;
            this.Controls.Add(titleLabel);

            Label infoLabel = new Label();
            infoLabel.Text = "The 3D interactive learning platform is active at:\n" + _url;
            infoLabel.Font = new Font("Segoe UI", 10, FontStyle.Regular);
            infoLabel.ForeColor = Color.FromArgb(55, 65, 81);
            infoLabel.Location = new Point(25, 55);
            infoLabel.Size = new Size(400, 45);
            this.Controls.Add(infoLabel);

            Button openBtn = new Button();
            openBtn.Text = "🌐 Open in Browser";
            openBtn.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            openBtn.BackColor = Color.FromArgb(217, 119, 6); // Warm Amber
            openBtn.ForeColor = Color.White;
            openBtn.FlatStyle = FlatStyle.Flat;
            openBtn.Location = new Point(25, 120);
            openBtn.Size = new Size(185, 42);
            openBtn.Cursor = Cursors.Hand;
            openBtn.FlatAppearance.BorderSize = 0;
            openBtn.Click += new EventHandler(OpenBtn_Click);
            this.Controls.Add(openBtn);

            Button exitBtn = new Button();
            exitBtn.Text = "❌ Stop & Exit";
            exitBtn.Font = new Font("Segoe UI", 10, FontStyle.Regular);
            exitBtn.BackColor = Color.FromArgb(243, 237, 226);
            exitBtn.ForeColor = Color.FromArgb(75, 85, 99);
            exitBtn.FlatStyle = FlatStyle.Flat;
            exitBtn.Location = new Point(230, 120);
            exitBtn.Size = new Size(185, 42);
            exitBtn.Cursor = Cursors.Hand;
            exitBtn.FlatAppearance.BorderSize = 1;
            exitBtn.FlatAppearance.BorderColor = Color.FromArgb(214, 199, 178);
            exitBtn.Click += new EventHandler(ExitBtn_Click);
            this.Controls.Add(exitBtn);

            Label footerLabel = new Label();
            footerLabel.Text = "Minimize this window to keep the server running in background.";
            footerLabel.Font = new Font("Segoe UI", 8.5f, FontStyle.Italic);
            footerLabel.ForeColor = Color.FromArgb(120, 113, 108);
            footerLabel.Location = new Point(25, 180);
            footerLabel.AutoSize = true;
            this.Controls.Add(footerLabel);
        }

        private void OpenBtn_Click(object sender, EventArgs e)
        {
            try
            {
                Process.Start(new ProcessStartInfo(_url) { UseShellExecute = true });
            }
            catch {}
        }

        private void ExitBtn_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
