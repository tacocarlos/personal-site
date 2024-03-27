import loginStyles from "./login.module.css"

function AdminLoginPanel() {
    return (
        <div className={loginStyles.loginWrapper}>
            <h1>Please Log In</h1>            
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}


export default function AdminLogin() {
    return (
        <main>
            <AdminLoginPanel />
        </main>
    )
}