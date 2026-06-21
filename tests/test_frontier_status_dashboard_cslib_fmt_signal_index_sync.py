import subprocess


def test_frontier_status_dashboard_cslib_fmt_signal_index_sync():
    subprocess.run(
        [
            "python3",
            "-B",
            "tools/verify_frontier_status_dashboard_cslib_fmt_signal_index_sync.py",
        ],
        check=True,
    )
