import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel('Resultado da Verificação');

    let disposable = vscode.commands.registerCommand('extension.verificarVulnerabilidades', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const { selection, document } = editor;
            const selectedText = document.getText(selection);

            if (selectedText) {
                try {
                    const response = await axios.post('https://chatgpt-api.kmr.dev.br/api/check', {
                        origem: "vscode",
                        entrada: selectedText
                    });
    
                    const mensagem = response.data.retorno;

                    outputChannel.clear(); // Limpar a saída anterior
                    outputChannel.appendLine(mensagem);
                    outputChannel.show();
                } catch (error: any) {
                    vscode.window.showErrorMessage('Erro ao fazer a requisição para a API: ' + error.message);
                }
            } else {
                vscode.window.showWarningMessage('Nenhum texto selecionado.');
            }
        } else {
            vscode.window.showErrorMessage('Nenhum editor aberto para obter o conteúdo do arquivo.');
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}
