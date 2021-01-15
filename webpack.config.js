const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = [{
    entry: {
        Index: [path.resolve('src', 'components', 'pages', 'Index.jsx')],        
        
        // Blog: [path.resolve('src', 'components', 'blog', 'Blog.jsx')],
        // Category: [path.resolve('src', 'components', 'blog', 'Blog.jsx')],
        // Search: [path.resolve('src', 'components', 'blog', 'Blog.jsx')],
        // Single: [path.resolve('src', 'components', 'blog', 'Single.jsx')],
        
        // Register: [path.resolve('src', 'components', 'auth', 'Register.jsx')],
        // Login: [path.resolve('src', 'components', 'auth', 'Login.jsx')],
        // ForgotPassword: [path.resolve('src', 'components', 'auth', 'ForgotPassword.jsx')],
        // ResetPassword: [path.resolve('src', 'components', 'auth', 'ResetPassword.jsx')],

        // AdminBlogMeta: [path.resolve('src', 'components', 'admin', 'AdminBlogMeta.jsx')],
        // AdminBlogs: [path.resolve('src', 'components', 'admin', 'AdminBlogs.jsx')],
        // AdminComments: [path.resolve('src', 'components', 'admin', 'AdminComments.jsx')],
        // AdminLead: [path.resolve('src', 'components', 'admin', 'AdminLead.jsx')],
        // AdminMeta: [path.resolve('src', 'components', 'admin', 'AdminMeta.jsx')],
        // AdminUsers: [path.resolve('src', 'components', 'admin', 'AdminUsers.jsx')],
    },
    output: {
        path: path.resolve(__dirname, 'src', 'static', 'public'),
        filename: 'js/[chunkhash].js',
        publicPath: '/public'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /static/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/transform-runtime']
                    }
                }
            }, 
            {
                test: /\.ejs$/,
                loader: 'raw-loader'
            }, 
            {
                test: /\.(css)/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/public/css/'
                    }
                }, 'css-loader']  
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*']
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '.',
            cacheGroups: {
                react: {
                    chunks: 'initial',
                }
            }
        }
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ chunkFilename: 'css/[hash].css' }),
        new HtmlWebpackPlugin({ chunks: ['Index'], filename: '../views/pages/Index.ejs', template: path.join('src', 'views', 'index.ejs') }),
        
        // new HtmlWebpackPlugin({ chunks: ['Blog'], filename: '../views/pages/Blog.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['Single'], filename: '../views/pages/Single.ejs', template: path.join('src', 'views', 'index.ejs') }),
        
        // new HtmlWebpackPlugin({ chunks: ['Register'], filename: '../views/auth/Register.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['Login'], filename: '../views/auth/Login.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['ForgotPassword'], filename: '../views/auth/ForgotPassword.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['ResetPassword'], filename: '../views/auth/ResetPassword.ejs', template: path.join('src', 'views', 'index.ejs') }),
        
        // new HtmlWebpackPlugin({ chunks: ['AdminBlogMeta'], filename: '../views/admin/AdminBlogMeta.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['AdminBlogs'], filename: '../views/admin/AdminBlogs.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['AdminComments'], filename: '../views/admin/AdminComments.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['AdminLead'], filename: '../views/admin/AdminLead.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['AdminMeta'], filename: '../views/admin/AdminMeta.ejs', template: path.join('src', 'views', 'index.ejs') }),
        // new HtmlWebpackPlugin({ chunks: ['AdminUsers'], filename: '../views/admin/AdminUsers.ejs', template: path.join('src', 'views', 'index.ejs') }),
    ]
}]

module.exports = config